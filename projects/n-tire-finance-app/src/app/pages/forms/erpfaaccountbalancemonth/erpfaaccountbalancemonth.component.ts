import { erpfaaccountbalancemonthService } from './../../../service/erpfaaccountbalancemonth.service';
import { erpfaaccountbalancemonth } from './../../../model/erpfaaccountbalancemonth.model';
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
import { bofinancialyear} from '../../../../../../n-tire-bo-app/src/app/model/bofinancialyear.model';
import { bofinancialyearService } from '../../../../../../n-tire-bo-app/src/app/service/bofinancialyear.service';
//popups
import { erpfaaccountperiodmaster} from './../../../model/erpfaaccountperiodmaster.model';
import { erpfaaccountperiodmasterService } from './../../../service/erpfaaccountperiodmaster.service';
//popups
import { erpfaaccountmaster} from './../../../model/erpfaaccountmaster.model';
import { erpfaaccountmasterService } from './../../../service/erpfaaccountmaster.service';
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
selector: 'app-erpfaaccountbalancemonth',
templateUrl: './erpfaaccountbalancemonth.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpfaaccountbalancemonthComponent implements OnInit {
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
bfilterPopulateerpfaaccountbalancemonths:boolean=false;
dataerpfaaccountbalancemonthsfinyear3:any=[];
dataerpfaaccountbalancemonthsperiodid3:any=[];
dataerpfaaccountbalancemonthsaccountid3:any=[];
 erpfaaccountbalancemonthForm: FormGroup;
finyearList: bofinancialyear[];
periodidList: erpfaaccountperiodmaster[];
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
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpfaaccountbalancemonthservice: erpfaaccountbalancemonthService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bofinancialyearservice:bofinancialyearService,
private erpfaaccountperiodmasterservice:erpfaaccountperiodmasterService,
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
this.erpfaaccountbalancemonthForm  = this.fb.group({pk:[null],balmonthid: [null],
finyear: [null],
finyeardesc: [null],
periodid: [null],
periodiddesc: [null],
accountid: [null],
accountiddesc: [null],
openbalance: [null],
totalcredit: [null],
totaldebit: [null],
closingbalance: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpfaaccountbalancemonthForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpfaaccountbalancemonthForm.dirty && this.erpfaaccountbalancemonthForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.balmonthid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.balmonthid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.balmonthid && pkDetail) {
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
let erpfaaccountbalancemonthid = null;

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
this.formid=erpfaaccountbalancemonthid;
//this.sharedService.alert(erpfaaccountbalancemonthid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bofinancialyearservice.getbofinancialyearsList().then(res => 
{
this.finyearList = res as bofinancialyear[];
}
);
setTimeout(() => {
if(this.f.finyear.value && this.f.finyear.value!="" && this.f.finyear.value!=null)this.erpfaaccountperiodmasterservice.getListByfinyear(this.f.finyear.value).then(res =>{
this.periodidList = res as erpfaaccountperiodmaster[];
if(this.erpfaaccountbalancemonthservice.formData && this.erpfaaccountbalancemonthservice.formData.periodid){this.erpfaaccountbalancemonthForm.patchValue({
    periodid: this.erpfaaccountbalancemonthservice.formData.periodid,
    periodiddesc: this.erpfaaccountbalancemonthservice.formData.periodiddesc,
});
}
});
});
this.erpfaaccountmasterservice.geterpfaaccountmastersList().then(res => 
{
this.accountidList = res as erpfaaccountmaster[];
if(this.erpfaaccountbalancemonthservice.formData && this.erpfaaccountbalancemonthservice.formData.accountid){
this.accountidoptionsEvent.emit(this.accountidList);
this.erpfaaccountbalancemonthForm.patchValue({
    accountid: this.erpfaaccountbalancemonthservice.formData.accountid,
    accountiddesc: this.erpfaaccountbalancemonthservice.formData.accountiddesc,
});
}
{
let arraccountid = this.accountidList.filter(v => v.accountid == this.erpfaaccountbalancemonthForm.get('accountid').value);
let objaccountid;
if (arraccountid.length > 0) objaccountid = arraccountid[0];
if (objaccountid)
{
}
}
}
);
this.accountid_erpfaaccountmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.accountidList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.accountid_erpfaaccountmastersformatter = (result: any) => result.accountname;

//autocomplete
    this.erpfaaccountbalancemonthservice.geterpfaaccountbalancemonthsList().then(res => {
      this.pkList = res as erpfaaccountbalancemonth[];
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
this.erpfaaccountbalancemonthForm.markAsUntouched();
this.erpfaaccountbalancemonthForm.markAsPristine();
}
onSelectedaccountid(accountidDetail: any) {
if (accountidDetail.accountid && accountidDetail) {
this.erpfaaccountbalancemonthForm.patchValue({
accountid: accountidDetail.accountid,
accountiddesc: accountidDetail.accountname,

});

}
}




resetForm() {
if (this.erpfaaccountbalancemonthForm != null)
this.erpfaaccountbalancemonthForm.reset();
this.erpfaaccountbalancemonthForm.patchValue({
finyear: this.sessiondata.finyearid,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let balmonthid = this.erpfaaccountbalancemonthForm.get('balmonthid').value;
        if(balmonthid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpfaaccountbalancemonthservice.deleteerpfaaccountbalancemonth(balmonthid).then(res =>
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
    this.erpfaaccountbalancemonthForm.patchValue({
        balmonthid: null
    });
    if(this.erpfaaccountbalancemonthservice.formData.balmonthid!=null)this.erpfaaccountbalancemonthservice.formData.balmonthid=null;
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
        jsonstring='{"'+key+'": "'+mainscreendata[key] +'" }';
        json=JSON.parse(jsonstring);
}
        else
{
        jsonstring='{"'+key+'": '+mainscreendata[key] +' }';  
        json=JSON.parse(jsonstring);
}
{
        if(this.erpfaaccountbalancemonthForm.controls[key]!=null)
{
this.erpfaaccountbalancemonthForm.patchValue(json);
         if(bdisable)this.erpfaaccountbalancemonthForm.controls[key].disable({onlySelf: true});
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
balmonthidonChange(evt:any){
let e=evt.value;
}
finyearonChange(evt:any){
let e=evt.value;
this.erpfaaccountbalancemonthForm.patchValue({finyeardesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.finyear.value && this.f.finyear.value!="" && this.f.finyear.value!=null)this.erpfaaccountperiodmasterservice.getListByfinyear(this.f.finyear.value).then(res => this.periodidList = res as erpfaaccountperiodmaster[]);
});
}
periodidonChange(evt:any){
let e=evt.value;
this.erpfaaccountbalancemonthForm.patchValue({periodiddesc:evt.options[evt.options.selectedIndex].text});
}
accountidonChange(evt:any){
let e=evt.value;
}
openbalanceonChange(evt:any){
let e=evt.value;
}
totalcreditonChange(evt:any){
let e=evt.value;
}
totaldebitonChange(evt:any){
let e=evt.value;
}
closingbalanceonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){this.erpfaaccountbalancemonthservice.geterpfaaccountbalancemonthsByEID(pkcol).then(res => {

this.erpfaaccountbalancemonthservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.erpfaaccountbalancemonth.balmonthid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.erpfaaccountbalancemonth.balmonthid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpfaaccountbalancemonthForm.patchValue({
balmonthid: res.erpfaaccountbalancemonth.balmonthid,
finyear: res.erpfaaccountbalancemonth.finyear,
finyeardesc: res.erpfaaccountbalancemonth.finyeardesc,
periodid: res.erpfaaccountbalancemonth.periodid,
periodiddesc: res.erpfaaccountbalancemonth.periodiddesc,
accountid: res.erpfaaccountbalancemonth.accountid,
accountiddesc: res.erpfaaccountbalancemonth.accountiddesc,
openbalance: res.erpfaaccountbalancemonth.openbalance,
totalcredit: res.erpfaaccountbalancemonth.totalcredit,
totaldebit: res.erpfaaccountbalancemonth.totaldebit,
closingbalance: res.erpfaaccountbalancemonth.closingbalance,
status: res.erpfaaccountbalancemonth.status,
statusdesc: res.erpfaaccountbalancemonth.statusdesc,
});
setTimeout(() => {
if(this.f.finyear.value && this.f.finyear.value!="" && this.f.finyear.value!=null)this.erpfaaccountperiodmasterservice.getListByfinyear(this.f.finyear.value).then(res =>{
this.periodidList = res as erpfaaccountperiodmaster[];
});
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
  for (let key in this.erpfaaccountbalancemonthForm.controls) {
    if (this.erpfaaccountbalancemonthForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpfaaccountbalancemonthForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpfaaccountbalancemonthForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpfaaccountbalancemonthForm.value;
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
Object.keys(this.erpfaaccountbalancemonthForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpfaaccountbalancemonthForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpfaaccountbalancemonthForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpfaaccountbalancemonthservice.formData=this.erpfaaccountbalancemonthForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpfaaccountbalancemonthForm.controls[key] != null)
    {
        this.erpfaaccountbalancemonthservice.formData[key] = this.erpfaaccountbalancemonthForm.controls[key].value;
    }
}
}
}
console.log(this.erpfaaccountbalancemonthservice.formData);
this.erpfaaccountbalancemonthservice.formData=this.erpfaaccountbalancemonthForm.value;
this.erpfaaccountbalancemonthservice.saveOrUpdateerpfaaccountbalancemonths().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.erpfaaccountbalancemonth);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpfaaccountbalancemonthservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.erpfaaccountbalancemonth);
}
else
{
this.FillData(res);
}
}
this.erpfaaccountbalancemonthForm.markAsUntouched();
this.erpfaaccountbalancemonthForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditfinyear( finyearid) {
/*let ScreenType='2';
this.dialog.open(bofinancialyearComponent, 
{
data: {finyearid:this.erpfaaccountbalancemonthForm.get('finyear').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditperiodid( periodid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountperiodmasterComponent, 
{
data: {periodid:this.erpfaaccountbalancemonthForm.get('periodid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditaccountid( accountid) {
/*let ScreenType='2';
this.dialog.open(erpfaaccountmasterComponent, 
{
data: {accountid:this.erpfaaccountbalancemonthForm.get('accountid').value, ScreenType:2 }
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



