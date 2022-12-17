import { erptaxcalculationService } from './../../../service/erptaxcalculation.service';
import { erptaxcalculation } from './../../../model/erptaxcalculation.model';
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
import { erptaxmaster} from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
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

@Component({
selector: 'app-erptaxcalculation',
templateUrl: './erptaxcalculation.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erptaxcalculationComponent implements OnInit {
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
bfilterPopulateerptaxcalculations:boolean=false;
dataerptaxcalculationstaxid3:any=[];
dataerptaxcalculationscalculationtype3:any=[];
dataerptaxcalculationsaccountid3:any=[];
 erptaxcalculationForm: FormGroup;
taxidList: erptaxmaster[];
taxidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
taxid_erptaxmastersForm: FormGroup;//autocomplete
taxid_erptaxmastersoptions:any;//autocomplete
taxid_erptaxmastersformatter:any;//autocomplete
calculationtypeList: boconfigvalue[];
accountidList: erpfaaccountmaster[];
accountidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
accountid_erpfaaccountmastersForm: FormGroup;//autocomplete
accountid_erpfaaccountmastersoptions:any;//autocomplete
accountid_erpfaaccountmastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erptaxcalculationshowOption:boolean;
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
private erptaxcalculationservice: erptaxcalculationService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erptaxmasterservice:erptaxmasterService,
private erpfaaccountmasterservice:erpfaaccountmasterService,
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
this.erptaxcalculationForm  = this.fb.group({
pk:[null],
calculationid: [null],
taxid: [null],
taxiddesc: [null],
calculationtype: [null],
calculationtypedesc: [null],
accountid: [null],
accountiddesc: [null],
rate: [null, Validators.required],
amount: [null],
total: [null, Validators.required],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erptaxcalculationForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erptaxcalculationForm.dirty && this.erptaxcalculationForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.calculationid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.calculationid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.calculationid && pkDetail) {
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
let erptaxcalculationid = null;

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
this.formid=erptaxcalculationid;
//this.sharedService.alert(erptaxcalculationid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.taxidList = res as erptaxmaster[];
if(this.erptaxcalculationservice.formData && this.erptaxcalculationservice.formData.taxid){
this.taxidoptionsEvent.emit(this.taxidList);
this.erptaxcalculationForm.patchValue({
    taxid: this.erptaxcalculationservice.formData.taxid,
    taxiddesc: this.erptaxcalculationservice.formData.taxiddesc,
});
}
{
let arrtaxid = this.taxidList.filter(v => v.taxid == this.erptaxcalculationForm.get('taxid').value);
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
this.configservice.getList("taxcalculationtype").then(res => this.calculationtypeList = res as boconfigvalue[]);
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accountidList = res as erpfaaccountmaster[];
if(this.erptaxcalculationservice.formData && this.erptaxcalculationservice.formData.accountid){
this.accountidoptionsEvent.emit(this.accountidList);
this.erptaxcalculationForm.patchValue({
    accountid: this.erptaxcalculationservice.formData.accountid,
    accountiddesc: this.erptaxcalculationservice.formData.accountiddesc,
});
}
{
let arraccountid = this.accountidList.filter(v => v.accountid == this.erptaxcalculationForm.get('accountid').value);
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

//autocomplete
    this.erptaxcalculationservice.geterptaxcalculationsList().then(res => {
      this.pkList = res as erptaxcalculation[];
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
this.erptaxcalculationForm.markAsUntouched();
this.erptaxcalculationForm.markAsPristine();
}
onSelectedtaxid(taxidDetail: any) {
if (taxidDetail.taxid && taxidDetail) {
this.erptaxcalculationForm.patchValue({
taxid: taxidDetail.taxid,
taxiddesc: taxidDetail.taxname,

});

}
}

onSelectedaccountid(accountidDetail: any) {
if (accountidDetail.accountid && accountidDetail) {
this.erptaxcalculationForm.patchValue({
accountid: accountidDetail.accountid,
accountiddesc: accountidDetail.accountname,

});

}
}




resetForm() {
if (this.erptaxcalculationForm != null)
this.erptaxcalculationForm.reset();
this.erptaxcalculationForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let calculationid = this.erptaxcalculationForm.get('calculationid').value;
        if(calculationid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erptaxcalculationservice.deleteerptaxcalculation(calculationid).then(res =>
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
    this.erptaxcalculationForm.patchValue({
        calculationid: null
    });
    if(this.erptaxcalculationservice.formData.calculationid!=null)this.erptaxcalculationservice.formData.calculationid=null;
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
this.erptaxcalculationForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erptaxcalculationForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erptaxcalculationForm.controls[key]!=undefined)
{
this.erptaxcalculationForm.controls[key].disable({onlySelf: true});
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
calculationidonChange(evt:any){
let e=evt.value;
}
taxidonChange(evt:any){
let e=evt.value;
}
calculationtypeonChange(evt:any){
let e=this.f.calculationtype.value as any;
this.erptaxcalculationForm.patchValue({calculationtypedesc:evt.options[evt.options.selectedIndex].text});
}
accountidonChange(evt:any){
let e=evt.value;
}
rateonChange(evt:any){
let e=evt.value;
}
amountonChange(evt:any){
let e=evt.value;
}
totalonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerptaxcalculations() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erptaxcalculationservice.geterptaxcalculationsByEID(pkcol).then(res => {

this.erptaxcalculationservice.formData=res.erptaxcalculation;
let formproperty=res.erptaxcalculation.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erptaxcalculation.pkcol;
this.formid=res.erptaxcalculation.calculationid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erptaxcalculation.calculationid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erptaxcalculationForm.patchValue({
calculationid: res.erptaxcalculation.calculationid,
taxid: res.erptaxcalculation.taxid,
taxiddesc: res.erptaxcalculation.taxiddesc,
calculationtype: res.erptaxcalculation.calculationtype,
calculationtypedesc: res.erptaxcalculation.calculationtypedesc,
accountid: res.erptaxcalculation.accountid,
accountiddesc: res.erptaxcalculation.accountiddesc,
rate: res.erptaxcalculation.rate,
amount: res.erptaxcalculation.amount,
total: res.erptaxcalculation.total,
status: res.erptaxcalculation.status,
statusdesc: res.erptaxcalculation.statusdesc,
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
  for (let key in this.erptaxcalculationForm.controls) {
    if (this.erptaxcalculationForm.controls[key] != null) {
if(false)
{
if(this.erptaxcalculationservice.formData!=null && this.erptaxcalculationservice.formData[key]!=null  && this.erptaxcalculationservice.formData[key]!='[]' && this.erptaxcalculationservice.formData[key]!=undefined && this.erptaxcalculationservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erptaxcalculationservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erptaxcalculationservice.formData!=null && this.erptaxcalculationservice.formData[key]!=null   && this.erptaxcalculationservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erptaxcalculationservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erptaxcalculationservice.formData!=null && this.erptaxcalculationservice.formData[key]!=null   && this.erptaxcalculationservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erptaxcalculationservice.formData[key]+"'><div class='progress__number'>"+this.erptaxcalculationservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptaxcalculationForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erptaxcalculationForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erptaxcalculationForm.value;
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

private erptaxcalculationtoggleOption(){
this.erptaxcalculationshowOption = this.erptaxcalculationshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erptaxcalculationForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erptaxcalculationForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erptaxcalculationForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erptaxcalculationservice.formData=this.erptaxcalculationForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erptaxcalculationForm.controls[key] != null)
    {
        this.erptaxcalculationservice.formData[key] = this.erptaxcalculationForm.controls[key].value;
    }
}
}
}
console.log(this.erptaxcalculationservice.formData);
this.erptaxcalculationservice.formData=this.erptaxcalculationForm.value;
this.erptaxcalculationservice.saveOrUpdateerptaxcalculations().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptaxcalculation);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erptaxcalculationservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptaxcalculation);
}
else
{
this.FillData(res);
}
}
this.erptaxcalculationForm.markAsUntouched();
this.erptaxcalculationForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdittaxid( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.erptaxcalculationForm.get('taxid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaccountid( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.erptaxcalculationForm.get('accountid').value, ScreenType:2 }
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



