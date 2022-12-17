import { lmsquotepaymenttermService } from './../../../service/lmsquotepaymentterm.service';
import { lmsquotepaymentterm } from './../../../model/lmsquotepaymentterm.model';
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
import { erpsupplierquotationmaster} from '../../../../../../n-tire-procurement-app/src/app/model/erpsupplierquotationmaster.model';
import { erpsupplierquotationmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsupplierquotationmaster.service';
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

@Component({
selector: 'app-lmsquotepaymentterm',
templateUrl: './lmsquotepaymentterm.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmsquotepaymenttermComponent implements OnInit {
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
bfilterPopulatelmsquotepaymentterms:boolean=false;
datalmsquotepaymenttermsopportunityid3:any=[];
datalmsquotepaymenttermsquoteid3:any=[];
datalmsquotepaymenttermsduedate3:any=[];
 lmsquotepaymenttermForm: FormGroup;
opportunityidList: lmsopportunity[];
opportunityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
opportunityid_lmsopportunitiesForm: FormGroup;//autocomplete
opportunityid_lmsopportunitiesoptions:any;//autocomplete
opportunityid_lmsopportunitiesformatter:any;//autocomplete
quoteidList: erpsupplierquotationmaster[];
quoteidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
quoteid_erpsupplierquotationmastersForm: FormGroup;//autocomplete
quoteid_erpsupplierquotationmastersoptions:any;//autocomplete
quoteid_erpsupplierquotationmastersformatter:any;//autocomplete
duedateList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
lmsquotepaymenttermshowOption:boolean;
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
private lmsquotepaymenttermservice: lmsquotepaymenttermService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private lmsopportunityservice:lmsopportunityService,
private erpsupplierquotationmasterservice:erpsupplierquotationmasterService,
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
this.lmsquotepaymenttermForm  = this.fb.group({
pk:[null],
paymenttermid: [null],
branchid: [null],
leadid: [null],
opportunityid: [null],
opportunityiddesc: [null],
quoteid: [null],
quoteiddesc: [null],
description: [null],
duedate: [null],
duedatedesc: [null],
invoicepercentage: [null],
paymentamount: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmsquotepaymenttermForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmsquotepaymenttermForm.dirty && this.lmsquotepaymenttermForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.paymenttermid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.paymenttermid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.paymenttermid && pkDetail) {
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
let lmsquotepaymenttermid = null;

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
this.formid=lmsquotepaymenttermid;
//this.sharedService.alert(lmsquotepaymenttermid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
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
if(this.lmsquotepaymenttermservice.formData && this.lmsquotepaymenttermservice.formData.opportunityid){
this.opportunityidoptionsEvent.emit(this.opportunityidList);
this.lmsquotepaymenttermForm.patchValue({
    opportunityid: this.lmsquotepaymenttermservice.formData.opportunityid,
    opportunityiddesc: this.lmsquotepaymenttermservice.formData.opportunityiddesc,
});
}
{
let arropportunityid = this.opportunityidList.filter(v => v.opportunityid == this.lmsquotepaymenttermForm.get('opportunityid').value);
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
this.erpsupplierquotationmasterservice.geterpsupplierquotationmastersList().then(res => 
{
this.quoteidList = res as erpsupplierquotationmaster[];
if(this.lmsquotepaymenttermservice.formData && this.lmsquotepaymenttermservice.formData.quoteid){
this.quoteidoptionsEvent.emit(this.quoteidList);
this.lmsquotepaymenttermForm.patchValue({
    quoteid: this.lmsquotepaymenttermservice.formData.quoteid,
    quoteiddesc: this.lmsquotepaymenttermservice.formData.quoteiddesc,
});
}
{
let arrquoteid = this.quoteidList.filter(v => v.quotationid == this.lmsquotepaymenttermForm.get('quoteid').value);
let objquoteid;
if (arrquoteid.length > 0) objquoteid = arrquoteid[0];
if (objquoteid)
{
}
}
}
).catch((err) => {console.log(err);});
this.quoteid_erpsupplierquotationmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.quoteidList.filter(v => v.quotationreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.quoteid_erpsupplierquotationmastersformatter = (result: any) => result.quotationreference;
this.configservice.getList("duedate").then(res => this.duedateList = res as boconfigvalue[]);

//autocomplete
    this.lmsquotepaymenttermservice.getlmsquotepaymenttermsList().then(res => {
      this.pkList = res as lmsquotepaymentterm[];
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
this.lmsquotepaymenttermForm.markAsUntouched();
this.lmsquotepaymenttermForm.markAsPristine();
}
onSelectedopportunityid(opportunityidDetail: any) {
if (opportunityidDetail.opportunityid && opportunityidDetail) {
this.lmsquotepaymenttermForm.patchValue({
opportunityid: opportunityidDetail.opportunityid,
opportunityiddesc: opportunityidDetail.requirementdetails,

});

}
}

onSelectedquoteid(quoteidDetail: any) {
if (quoteidDetail.quotationid && quoteidDetail) {
this.lmsquotepaymenttermForm.patchValue({
quoteid: quoteidDetail.quotationid,
quoteiddesc: quoteidDetail.quotationreference,

});

}
}




resetForm() {
if (this.lmsquotepaymenttermForm != null)
this.lmsquotepaymenttermForm.reset();
this.lmsquotepaymenttermForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let paymenttermid = this.lmsquotepaymenttermForm.get('paymenttermid').value;
        if(paymenttermid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsquotepaymenttermservice.deletelmsquotepaymentterm(paymenttermid).then(res =>
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
    this.lmsquotepaymenttermForm.patchValue({
        paymenttermid: null
    });
    if(this.lmsquotepaymenttermservice.formData.paymenttermid!=null)this.lmsquotepaymenttermservice.formData.paymenttermid=null;
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
        else if(ctrltype=="string")
{
this.lmsquotepaymenttermForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmsquotepaymenttermForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmsquotepaymenttermForm.controls[key]!=undefined)
{
this.lmsquotepaymenttermForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
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
paymenttermidonChange(evt:any){
let e=evt.value;
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
descriptiononChange(evt:any){
let e=evt.value;
}
duedateonChange(evt:any){
let e=this.f.duedate.value as any;
this.lmsquotepaymenttermForm.patchValue({duedatedesc:evt.options[evt.options.selectedIndex].text});
}
invoicepercentageonChange(evt:any){
let e=evt.value;
}
paymentamountonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editlmsquotepaymentterms() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmsquotepaymenttermservice.getlmsquotepaymenttermsByEID(pkcol).then(res => {

this.lmsquotepaymenttermservice.formData=res.lmsquotepaymentterm;
let formproperty=res.lmsquotepaymentterm.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmsquotepaymentterm.pkcol;
this.formid=res.lmsquotepaymentterm.paymenttermid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmsquotepaymentterm.paymenttermid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmsquotepaymenttermForm.patchValue({
paymenttermid: res.lmsquotepaymentterm.paymenttermid,
branchid: res.lmsquotepaymentterm.branchid,
leadid: res.lmsquotepaymentterm.leadid,
opportunityid: res.lmsquotepaymentterm.opportunityid,
opportunityiddesc: res.lmsquotepaymentterm.opportunityiddesc,
quoteid: res.lmsquotepaymentterm.quoteid,
quoteiddesc: res.lmsquotepaymentterm.quoteiddesc,
description: res.lmsquotepaymentterm.description,
duedate: res.lmsquotepaymentterm.duedate,
duedatedesc: res.lmsquotepaymentterm.duedatedesc,
invoicepercentage: res.lmsquotepaymentterm.invoicepercentage,
paymentamount: res.lmsquotepaymentterm.paymentamount,
status: res.lmsquotepaymentterm.status,
statusdesc: res.lmsquotepaymentterm.statusdesc,
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
  for (let key in this.lmsquotepaymenttermForm.controls) {
    if (this.lmsquotepaymenttermForm.controls[key] != null) {
if(false)
{
if(this.lmsquotepaymenttermservice.formData!=null && this.lmsquotepaymenttermservice.formData[key]!=null  && this.lmsquotepaymenttermservice.formData[key]!='[]' && this.lmsquotepaymenttermservice.formData[key]!=undefined && this.lmsquotepaymenttermservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmsquotepaymenttermservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmsquotepaymenttermservice.formData!=null && this.lmsquotepaymenttermservice.formData[key]!=null   && this.lmsquotepaymenttermservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmsquotepaymenttermservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmsquotepaymenttermservice.formData!=null && this.lmsquotepaymenttermservice.formData[key]!=null   && this.lmsquotepaymenttermservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmsquotepaymenttermservice.formData[key]+"'><div class='progress__number'>"+this.lmsquotepaymenttermservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmsquotepaymenttermForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmsquotepaymenttermForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.lmsquotepaymenttermForm.value;
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

private lmsquotepaymenttermtoggleOption(){
this.lmsquotepaymenttermshowOption = this.lmsquotepaymenttermshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmsquotepaymenttermForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmsquotepaymenttermForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmsquotepaymenttermForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmsquotepaymenttermservice.formData=this.lmsquotepaymenttermForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmsquotepaymenttermForm.controls[key] != null)
    {
        this.lmsquotepaymenttermservice.formData[key] = this.lmsquotepaymenttermForm.controls[key].value;
    }
}
}
}
console.log(this.lmsquotepaymenttermservice.formData);
this.lmsquotepaymenttermservice.formData=this.lmsquotepaymenttermForm.value;
this.lmsquotepaymenttermservice.saveOrUpdatelmsquotepaymentterms().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsquotepaymentterm);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmsquotepaymenttermservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsquotepaymentterm);
}
else
{
this.FillData(res);
}
}
this.lmsquotepaymenttermForm.markAsUntouched();
this.lmsquotepaymenttermForm.markAsPristine();
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
data: {opportunityid:this.lmsquotepaymenttermForm.get('opportunityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditquoteid( quotationid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierquotationmasterComponent, 
{
data: {quotationid:this.lmsquotepaymenttermForm.get('quoteid').value, ScreenType:2 }
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



