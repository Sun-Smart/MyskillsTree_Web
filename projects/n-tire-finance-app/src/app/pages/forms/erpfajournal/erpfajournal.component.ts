import { erpfajournalService } from './../../../service/erpfajournal.service';
import { erpfajournal } from './../../../model/erpfajournal.model';
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
import { erpfabankaccount} from './../../../model/erpfabankaccount.model';
import { erpfabankaccountService } from './../../../service/erpfabankaccount.service';
//popups
//detail table services
import { erpfajournaldetail } from './../../../model/erpfajournaldetail.model';
//FK services
import { erpfaaccountmaster,IerpfaaccountmasterResponse } from './../../../model/erpfaaccountmaster.model';
import { erpfaaccountmasterService } from './../../../service/erpfaaccountmaster.service';
import { erpfajournalcostcenter } from './../../../model/erpfajournalcostcenter.model';
//FK services
import { erpfacostcenter,IerpfacostcenterResponse } from './../../../model/erpfacostcenter.model';
import { erpfacostcenterService } from './../../../service/erpfacostcenter.service';
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

@Component({
selector: 'app-erpfajournal',
templateUrl: './erpfajournal.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpfajournalComponent implements OnInit {
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
data3:any=[];
bfilterPopulateerpfajournals:boolean=false;
dataerpfajournalsbranchid3:any=[];
dataerpfajournalstype3:any=[];
dataerpfajournalsmode3:any=[];
dataerpfajournalscategory3:any=[];
dataerpfajournalsbank3:any=[];
dataerpfajournaldetailsaccountid3:any=[];
dataerpfajournaldetailstxntype3:any=[];
bfilterPopulateerpfajournaldetails:boolean=false;
dataerpfajournalcostcenterscostcenterid3:any=[];
bfilterPopulateerpfajournalcostcenters:boolean=false;
@ViewChild('tblerpfajournaldetailssource',{static:false}) tblerpfajournaldetailssource: Ng2SmartTableComponent;
@ViewChild('tblerpfajournalcostcenterssource',{static:false}) tblerpfajournalcostcenterssource: Ng2SmartTableComponent;
 erpfajournalForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
typeList: boconfigvalue[];
modeList: boconfigvalue[];
categoryList: boconfigvalue[];
bankList: erpfabankaccount[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



erpfajournaldetailsvisiblelist:any;
erpfajournaldetailshidelist:any;
erpfajournalcostcentersvisiblelist:any;
erpfajournalcostcentershidelist:any;

DeletederpfajournaldetailIDs: string="";
erpfajournaldetailsID: string = "1";
erpfajournaldetailsselectedindex:any;
DeletederpfajournalcostcenterIDs: string="";
erpfajournalcostcentersID: string = "2";
erpfajournalcostcentersselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpfajournalservice: erpfajournalService,
private erpfaaccountmasterservice: erpfaaccountmasterService,
private erpfacostcenterservice: erpfacostcenterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private erpfabankaccountservice:erpfabankaccountService,
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
this.erpfajournalForm  = this.fb.group({pk:[null],journalid: [null],
branchid: [null],
branchiddesc: [null],
type: [null],
typedesc: [null],
reference: [null],
journaldate: [null],
journalcode: [null],
mode: [null],
modedesc: [null],
category: [null],
categorydesc: [null],
ismulticurrency: [null],
billreference: [null],
billdate: [null],
billduedate: [null],
otherreference: [null],
otherdate: [null],
narration: [null],
cdreference: [null],
currency: [null],
cdamount: [null],
bank: [null],
bankdesc: [null],
chequenumber: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
totdebitamount: [null],
totcreditamount: [null],
});
}

get f() { return this.erpfajournalForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpfajournalForm.dirty && this.erpfajournalForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.journalid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.journalid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.journalid && pkDetail) {
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
let erpfajournalid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)this.data=this.data.data;
 if(this.data!=null && this.data.showview!=undefined  && this.data.showview!=null)this.showview=this.data.showview;
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
this.formid=erpfajournalid;
//this.sharedService.alert(erpfajournalid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpfajournaldetailsTableConfig();
  setTimeout(() => {
  this.SeterpfajournaldetailsTableddConfig();
  });

this.SeterpfajournalcostcentersTableConfig();
  setTimeout(() => {
  this.SeterpfajournalcostcentersTableddConfig();
  });

this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.erpfajournalservice.formData && this.erpfajournalservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpfajournalForm.patchValue({
    branchid: this.erpfajournalservice.formData.branchid,
    branchiddesc: this.erpfajournalservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpfajournalForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
);
this.branchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bobranchmastersformatter = (result: any) => result.branchname;
this.configservice.getList("journaltype").then(res => this.typeList = res as boconfigvalue[]);
this.configservice.getList("journalmode").then(res => this.modeList = res as boconfigvalue[]);
this.configservice.getList("journalcategory").then(res => this.categoryList = res as boconfigvalue[]);
this.erpfabankaccountservice.geterpfabankaccountsList().then(res => 
{
this.bankList = res as erpfabankaccount[];
}
);

//autocomplete
    this.erpfajournalservice.geterpfajournalsList().then(res => {
      this.pkList = res as erpfajournal[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.erpfajournalForm.markAsUntouched();
this.erpfajournalForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpfajournalForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}




resetForm() {
if (this.erpfajournalForm != null)
this.erpfajournalForm.reset();
this.erpfajournalForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
this.erpfajournalForm.patchValue({
journaldate: this.ngbDateParserFormatter.parse(new Date().toString()),
billdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
billduedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
otherdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
setTimeout(() => {
this.erpfajournalservice.erpfajournaldetails=[];
this.erpfajournaldetailsLoadTable();
this.erpfajournalservice.erpfajournalcostcenters=[];
this.erpfajournalcostcentersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let journalid = this.erpfajournalForm.get('journalid').value;
        if(journalid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpfajournalservice.deleteerpfajournal(journalid).then(res =>
                {
                this.resetForm();
                }
            );
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.erpfajournalForm.patchValue({
        journalid: null
    });
    if(this.erpfajournalservice.formData.journalid!=null)this.erpfajournalservice.formData.journalid=null;
for (let i=0;i<this.erpfajournalservice.erpfajournaldetails.length;i++) {
this.erpfajournalservice.erpfajournaldetails[i].jdetailid=null;
}
for (let i=0;i<this.erpfajournalservice.erpfajournalcostcenters.length;i++) {
this.erpfajournalservice.erpfajournalcostcenters[i].jdetailid=null;
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
        else if(key=="journaldate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="billdate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="billduedate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="otherdate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(ctrltype=="string")
{
        jsonstring='{"'+key+'": "'+mainscreendata[key] +'" }';
        json=JSON.parse(jsonstring);
}
        else
{
        jsonstring='{"'+key+'": '+mainscreendata[key] +' }';  
        json=JSON.parse(jsonstring);
}
{
        if(this.erpfajournalForm.controls[key]!=null)
{
this.erpfajournalForm.patchValue(json);
         if(bdisable)this.erpfajournalForm.controls[key].disable({onlySelf: true});
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
if(this.data.save==true)
{
    this.onSubmitData(false);
}
else if(this.data!=null  && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
journalidonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
typeonChange(evt:any){
let e=this.f.type.value as any;
this.erpfajournalForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
referenceonChange(evt:any){
let e=evt.value;
}
journaldateonChange(evt:any){
let e=evt.value;
}
journalcodeonChange(evt:any){
let e=evt.value;
}
modeonChange(evt:any){
let e=this.f.mode.value as any;
this.erpfajournalForm.patchValue({modedesc:evt.options[evt.options.selectedIndex].text});
}
categoryonChange(evt:any){
let e=this.f.category.value as any;
this.erpfajournalForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}
ismulticurrencyonChange(evt:any){
let e=evt.value;
}
billreferenceonChange(evt:any){
let e=evt.value;
}
billdateonChange(evt:any){
let e=evt.value;
}
billduedateonChange(evt:any){
let e=evt.value;
}
otherreferenceonChange(evt:any){
let e=evt.value;
}
otherdateonChange(evt:any){
let e=evt.value;
}
narrationonChange(evt:any){
let e=evt.value;
}
cdreferenceonChange(evt:any){
let e=evt.value;
}
currencyonChange(evt:any){
let e=evt.value;
}
cdamountonChange(evt:any){
let e=evt.value;
}
bankonChange(evt:any){
let e=evt.value;
this.erpfajournalForm.patchValue({bankdesc:evt.options[evt.options.selectedIndex].text});
}
chequenumberonChange(evt:any){
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

async PopulateScreen(pkcol:any){this.erpfajournalservice.geterpfajournalsByEID(pkcol).then(res => {

this.erpfajournalservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.erpfajournal.journalid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.erpfajournal.journalid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpfajournalForm.patchValue({
journalid: res.erpfajournal.journalid,
branchid: res.erpfajournal.branchid,
branchiddesc: res.erpfajournal.branchiddesc,
type: res.erpfajournal.type,
typedesc: res.erpfajournal.typedesc,
reference: res.erpfajournal.reference,
journaldate: this.ngbDateParserFormatter.parse(res.erpfajournal.journaldate),
journalcode: res.erpfajournal.journalcode,
mode: res.erpfajournal.mode,
modedesc: res.erpfajournal.modedesc,
category: res.erpfajournal.category,
categorydesc: res.erpfajournal.categorydesc,
ismulticurrency: res.erpfajournal.ismulticurrency,
billreference: res.erpfajournal.billreference,
billdate: this.ngbDateParserFormatter.parse(res.erpfajournal.billdate),
billduedate: this.ngbDateParserFormatter.parse(res.erpfajournal.billduedate),
otherreference: res.erpfajournal.otherreference,
otherdate: this.ngbDateParserFormatter.parse(res.erpfajournal.otherdate),
narration: res.erpfajournal.narration,
cdreference: res.erpfajournal.cdreference,
currency: res.erpfajournal.currency,
cdamount: res.erpfajournal.cdamount,
bank: res.erpfajournal.bank,
bankdesc: res.erpfajournal.bankdesc,
chequenumber: res.erpfajournal.chequenumber,
customfield: res.erpfajournal.customfield,
attachment: res.erpfajournal.attachment,
status: res.erpfajournal.status,
statusdesc: res.erpfajournal.statusdesc,
});
this.erpfajournaldetailsvisiblelist=res.erpfajournaldetailsvisiblelist;
this.erpfajournalcostcentersvisiblelist=res.erpfajournalcostcentersvisiblelist;
//Child Tables if any
this.erpfajournalservice.erpfajournaldetails = res.erpfajournaldetail;
this.SeterpfajournaldetailsTableConfig();
this.erpfajournaldetailsLoadTable();
  setTimeout(() => {
  this.SeterpfajournaldetailsTableddConfig();
  });
this.erpfajournalservice.erpfajournalcostcenters = res.erpfajournalcostcenter;
this.SeterpfajournalcostcentersTableConfig();
this.erpfajournalcostcentersLoadTable();
  setTimeout(() => {
  this.SeterpfajournalcostcentersTableddConfig();
  });
}

validate()
{
let ret=true;
if(this.erpfajournalForm.get('totdebitamount').value!=this.erpfajournalForm.get('totcreditamount').value)
{
this.toastr.addSingle("error", "", "Total Debit amount should equal to Credit Amount");
ret=false;
}
if(this.erpfajournalservice.erpfajournaldetails.length==0)
{
this.toastr.addSingle("error", "", "Atleast one Record in Journal Details");
ret=false;
}
if(this.erpfajournalForm.get('totdebitamount').value<=0)
{
this.toastr.addSingle("error", "", "Total Debit amount should be greater than zero");
ret=false;
}
return ret;
}

getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.erpfajournalForm.controls) {
    if (this.erpfajournalForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpfajournalForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpfajournalForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpfajournalForm.value;
obj.journaldate=this.ngbDateParserFormatter.format(this.erpfajournalForm.get('journaldate').value);
obj.billdate=this.ngbDateParserFormatter.format(this.erpfajournalForm.get('billdate').value);
obj.billduedate=this.ngbDateParserFormatter.format(this.erpfajournalForm.get('billduedate').value);
obj.otherdate=this.ngbDateParserFormatter.format(this.erpfajournalForm.get('otherdate').value);
//obj.customfield=JSON.stringify(customfields);
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
this.dialogRef.close(obj);
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
Object.keys(this.erpfajournalForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpfajournalForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpfajournalForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpfajournalservice.formData=this.erpfajournalForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpfajournalForm.controls[key] != null)
    {
        this.erpfajournalservice.formData[key] = this.erpfajournalForm.controls[key].value;
    }
}
}
}
this.erpfajournalservice.formData.journaldate=new Date(this.ngbDateParserFormatter.format(this.erpfajournalForm.get('journaldate').value)+'  UTC');
this.erpfajournalservice.formData.billdate=new Date(this.ngbDateParserFormatter.format(this.erpfajournalForm.get('billdate').value)+'  UTC');
this.erpfajournalservice.formData.billduedate=new Date(this.ngbDateParserFormatter.format(this.erpfajournalForm.get('billduedate').value)+'  UTC');
this.erpfajournalservice.formData.otherdate=new Date(this.ngbDateParserFormatter.format(this.erpfajournalForm.get('otherdate').value)+'  UTC');
//this.erpfajournalservice.formData.customfield=JSON.stringify(customfields);
//this.erpfajournalservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpfajournalservice.formData.DeletederpfajournaldetailIDs = this.DeletederpfajournaldetailIDs;
this.erpfajournalservice.formData.DeletederpfajournalcostcenterIDs = this.DeletederpfajournalcostcenterIDs;
console.log(this.erpfajournalservice.formData);
this.erpfajournalservice.formData=this.erpfajournalForm.value;
this.erpfajournalservice.saveOrUpdateerpfajournals().subscribe(
async res => {
if (this.erpfajournaldetailssource.data)
{
    for (let i = 0; i < this.erpfajournaldetailssource.data.length; i++)
    {
        if (this.erpfajournaldetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpfajournaldetailssource.data[i].fileattachmentlist);
    }
}
if (this.erpfajournalcostcenterssource.data)
{
    for (let i = 0; i < this.erpfajournalcostcenterssource.data.length; i++)
    {
        if (this.erpfajournalcostcenterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpfajournalcostcenterssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.erpfajournal);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpfajournalservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.erpfajournal);
}
else
{
this.FillData(res);
}
}
this.erpfajournalForm.markAsUntouched();
this.erpfajournalForm.markAsPristine();
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
data: {branchid:this.erpfajournalForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbank( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfabankaccountComponent, 
{
data: {accountid:this.erpfajournalForm.get('bank').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


onDeleteerpfajournaldetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpfajournaldetailIDs += childID + ",";
this.erpfajournalservice.erpfajournaldetails.splice(i, 1);
}

onDeleteerpfajournalcostcenter(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpfajournalcostcenterIDs += childID + ",";
this.erpfajournalservice.erpfajournalcostcenters.splice(i, 1);
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpfajournaldetails
erpfajournaldetailssettings:any;
erpfajournaldetailssource: any;

showerpfajournaldetailsCheckbox()
{
debugger;
if(this.tblerpfajournaldetailssource.settings['selectMode']== 'multi')this.tblerpfajournaldetailssource.settings['selectMode']= 'single';
else
this.tblerpfajournaldetailssource.settings['selectMode']= 'multi';
this.tblerpfajournaldetailssource.initGrid();
}
deleteerpfajournaldetailsAll()
{
this.tblerpfajournaldetailssource.settings['selectMode'] = 'single';
}
showerpfajournaldetailsFilter()
{
  setTimeout(() => {
  this.SeterpfajournaldetailsTableddConfig();
  });
      if(this.tblerpfajournaldetailssource.settings!=null)this.tblerpfajournaldetailssource.settings['hideSubHeader'] =!this.tblerpfajournaldetailssource.settings['hideSubHeader'];
this.tblerpfajournaldetailssource.initGrid();
}
showerpfajournaldetailsInActive()
{
}
enableerpfajournaldetailsInActive()
{
}
async SeterpfajournaldetailsTableddConfig()
{
if(!this.bfilterPopulateerpfajournaldetails){

this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res=>
{
var dataaccountid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpfajournaldetailsaccountid3.push(defaultobj);
for(let i=0; i<dataaccountid2.length; i++){
var obj= { value: dataaccountid2[i].accountid, title:dataaccountid2[i].accountcode+'  '+dataaccountid2[i].accountname};
this.dataerpfajournaldetailsaccountid3.push(obj);
}
if((this.tblerpfajournaldetailssource.settings as any).columns['accountid'])
{
(this.tblerpfajournaldetailssource.settings as any).columns['accountid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpfajournaldetailsaccountid3));
this.tblerpfajournaldetailssource.initGrid();
}
});

this.configservice.getList("fatxntype").then(res=>
{
var datatxntype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpfajournaldetailstxntype3.push(defaultobj);
for(let i=0; i<datatxntype2.length; i++){
var obj= { value: datatxntype2[i].configkey, title: datatxntype2[i].configtext};
this.dataerpfajournaldetailstxntype3.push(obj);
}
var clone = this.sharedService.clone(this.tblerpfajournaldetailssource.settings);
if(clone.columns['txntype']!=undefined)clone.columns['txntype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpfajournaldetailstxntype3)), }, };
if(clone.columns['txntype']!=undefined)clone.columns['txntype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpfajournaldetailstxntype3)), }, };
this.tblerpfajournaldetailssource.settings =  clone;
this.tblerpfajournaldetailssource.initGrid();
});
}
this.bfilterPopulateerpfajournaldetails=true;
}
async erpfajournaldetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpfajournaldetailsTableConfig()
{
this.erpfajournaldetailssettings = {
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
accountid: {
title: 'Account',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'oo2ro',reportcode:'oo2ro',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataerpfajournaldetailsaccountid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
txntype: {
title: 'Txn Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
            if(row["txntype"]=="C")
            {
              (this.tblerpfajournaldetailssource as Ng2SmartTableComponent).grid.dataSet.getColumns().find(c=>c.id=="credit").isEditable=true;
              (this.tblerpfajournaldetailssource as Ng2SmartTableComponent).grid.dataSet.getColumns().find(c=>c.id=="debit").isEditable=false;
            }
            if(row["txntype"]=="D")
            {
              (this.tblerpfajournaldetailssource as Ng2SmartTableComponent).grid.dataSet.getColumns().find(c=>c.id=="credit").isEditable=false;
              (this.tblerpfajournaldetailssource as Ng2SmartTableComponent).grid.dataSet.getColumns().find(c=>c.id=="debit").isEditable=true;
            }var element= this.dataerpfajournaldetailstxntype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
partytype: {
title: 'Party Type',
type: '',
filter:true,
},
party: {
title: 'Party',
type: 'number',
filter:true,
},
debit: {
title: 'Debit',
type: 'number',
filter:true,
valuePrepareFunction: (cell,row) => {
            let tot=0;
            for (let i=0;i< this.erpfajournalservice.erpfajournaldetails.length;i++) {
              debugger;
              let rowdetail=this.erpfajournalservice.erpfajournaldetails[i];
              tot+=+rowdetail["debit"];
            }
            this.f["totdebitamount"].setValue(tot);
            return cell;}, 
},
credit: {
title: 'Credit',
type: 'number',
filter:true,
valuePrepareFunction: (cell,row) => {
            let tot=0;
            for (let i=0;i< this.erpfajournalservice.erpfajournaldetails.length;i++) {
              debugger;
              let rowdetail=this.erpfajournalservice.erpfajournaldetails[i];
              tot+=+rowdetail["credit"];
            }
            this.f["totcreditamount"].setValue(tot);
            return cell;}, 
},
},
};
}
erpfajournaldetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpfajournaldetailsID)>=0)
{
this.erpfajournaldetailssource=new LocalDataSource();
this.erpfajournaldetailssource.load(this.erpfajournalservice.erpfajournaldetails as  any as LocalDataSource);
this.erpfajournaldetailssource.setPaging(1, 20, true);
}
}
erpfajournaldetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpfajournalservice.erpfajournaldetails.length == 0)
{
    this.tblerpfajournaldetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpfajournaldetail();
    this.erpfajournalservice.erpfajournaldetails.push(obj);
    this.erpfajournaldetailssource.refresh();
    if ((this.erpfajournalservice.erpfajournaldetails.length / this.erpfajournaldetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpfajournaldetailssource.getPaging().page)
    {
        this.erpfajournaldetailssource.setPage((this.erpfajournalservice.erpfajournaldetails.length / this.erpfajournaldetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpfajournaldetailssource.grid.edit(this.tblerpfajournaldetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpfajournaldetailssource.data.indexOf(event.data);
this.onDeleteerpfajournaldetail(event,event.data.jdetailid,((this.erpfajournaldetailssource.getPaging().page-1) *this.erpfajournaldetailssource.getPaging().perPage)+index);
this.erpfajournaldetailssource.refresh();
break;
}
}
erpfajournaldetailsPaging(val)
{
debugger;
this.erpfajournaldetailssource.setPaging(1, val, true);
}

handleerpfajournaldetailsGridSelected(event:any) {
this.erpfajournaldetailsselectedindex=this.erpfajournalservice.erpfajournaldetails.findIndex(i => i.jdetailid === event.data.jdetailid);
}
IserpfajournaldetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpfajournaldetailsID)>=0)
{
return "tbl";
}
else
{
return "hide";
}
}
//end of Grid Codes erpfajournaldetails
//start of Grid Codes erpfajournalcostcenters
erpfajournalcostcenterssettings:any;
erpfajournalcostcenterssource: any;

showerpfajournalcostcentersCheckbox()
{
debugger;
if(this.tblerpfajournalcostcenterssource.settings['selectMode']== 'multi')this.tblerpfajournalcostcenterssource.settings['selectMode']= 'single';
else
this.tblerpfajournalcostcenterssource.settings['selectMode']= 'multi';
this.tblerpfajournalcostcenterssource.initGrid();
}
deleteerpfajournalcostcentersAll()
{
this.tblerpfajournalcostcenterssource.settings['selectMode'] = 'single';
}
showerpfajournalcostcentersFilter()
{
  setTimeout(() => {
  this.SeterpfajournalcostcentersTableddConfig();
  });
      if(this.tblerpfajournalcostcenterssource.settings!=null)this.tblerpfajournalcostcenterssource.settings['hideSubHeader'] =!this.tblerpfajournalcostcenterssource.settings['hideSubHeader'];
this.tblerpfajournalcostcenterssource.initGrid();
}
showerpfajournalcostcentersInActive()
{
}
enableerpfajournalcostcentersInActive()
{
}
async SeterpfajournalcostcentersTableddConfig()
{
if(!this.bfilterPopulateerpfajournalcostcenters){

this.erpfacostcenterservice.geterpfacostcentersList().then(res=>
{
var datacostcenterid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpfajournalcostcenterscostcenterid3.push(defaultobj);
for(let i=0; i<datacostcenterid2.length; i++){
var obj= { value: datacostcenterid2[i].costcenterid, title:datacostcenterid2[i].costcentername};
this.dataerpfajournalcostcenterscostcenterid3.push(obj);
}
if((this.tblerpfajournalcostcenterssource.settings as any).columns['costcenterid'])
{
(this.tblerpfajournalcostcenterssource.settings as any).columns['costcenterid'].editor.config.list=JSON.parse(JSON.stringify(this.dataerpfajournalcostcenterscostcenterid3));
this.tblerpfajournalcostcenterssource.initGrid();
}
});
}
this.bfilterPopulateerpfajournalcostcenters=true;
}
async erpfajournalcostcentersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpfajournalcostcentersTableConfig()
{
this.erpfajournalcostcenterssettings = {
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
costcenterid: {
title: 'Cost Center',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpfajournalcostcenterscostcenterid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
percentageshare: {
title: 'Percentage Share',
type: 'number',
filter:true,
},
amount: {
title: 'Amount',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
return row["percentageshare"]*this.erpfajournalForm.get('cdamount').value/100;}, 
},
},
};
}
erpfajournalcostcentersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpfajournalcostcentersID)>=0)
{
this.erpfajournalcostcenterssource=new LocalDataSource();
this.erpfajournalcostcenterssource.load(this.erpfajournalservice.erpfajournalcostcenters as  any as LocalDataSource);
this.erpfajournalcostcenterssource.setPaging(1, 20, true);
}
}
erpfajournalcostcentersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpfajournalservice.erpfajournalcostcenters.length == 0)
{
    this.tblerpfajournalcostcenterssource.grid.createFormShown = true;
}
else
{
    let obj = new erpfajournalcostcenter();
    this.erpfajournalservice.erpfajournalcostcenters.push(obj);
    this.erpfajournalcostcenterssource.refresh();
    if ((this.erpfajournalservice.erpfajournalcostcenters.length / this.erpfajournalcostcenterssource.getPaging().perPage).toFixed(0) + 1 != this.erpfajournalcostcenterssource.getPaging().page)
    {
        this.erpfajournalcostcenterssource.setPage((this.erpfajournalservice.erpfajournalcostcenters.length / this.erpfajournalcostcenterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpfajournalcostcenterssource.grid.edit(this.tblerpfajournalcostcenterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpfajournalcostcenterssource.data.indexOf(event.data);
this.onDeleteerpfajournalcostcenter(event,event.data.jdetailid,((this.erpfajournalcostcenterssource.getPaging().page-1) *this.erpfajournalcostcenterssource.getPaging().perPage)+index);
this.erpfajournalcostcenterssource.refresh();
break;
}
}
erpfajournalcostcentersPaging(val)
{
debugger;
this.erpfajournalcostcenterssource.setPaging(1, val, true);
}

handleerpfajournalcostcentersGridSelected(event:any) {
this.erpfajournalcostcentersselectedindex=this.erpfajournalservice.erpfajournalcostcenters.findIndex(i => i.jdetailid === event.data.jdetailid);
}
IserpfajournalcostcentersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpfajournalcostcentersID)>=0)
{
return "tbl";
}
else
{
return "hide";
}
}
//end of Grid Codes erpfajournalcostcenters

}



