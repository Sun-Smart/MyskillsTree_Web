import { erpfachequestatusService } from './../../../service/erpfachequestatus.service';
import { erpfachequestatus } from './../../../model/erpfachequestatus.model';
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
import { erpfabankaccount} from './../../../model/erpfabankaccount.model';
import { erpfabankaccountService } from './../../../service/erpfabankaccount.service';
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
selector: 'app-erpfachequestatus',
templateUrl: './erpfachequestatus.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpfachequestatusComponent implements OnInit {
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
bfilterPopulateerpfachequestatuses:boolean=false;
dataerpfachequestatusesbankid3:any=[];
dataerpfachequestatusesstatus3:any=[];
 erpfachequestatusForm: FormGroup;
bankidList: erpfabankaccount[];
statusList: boconfigvalue[];
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
private erpfachequestatusservice: erpfachequestatusService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.erpfachequestatusForm  = this.fb.group({pk:[null],txnid: [null],
bankid: [null],
bankiddesc: [null],
chequenumber: [null],
issuedate: [null],
party: [null],
amount: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpfachequestatusForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpfachequestatusForm.dirty && this.erpfachequestatusForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.txnid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.txnid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.txnid && pkDetail) {
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
let erpfachequestatusid = null;

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
this.formid=erpfachequestatusid;
//this.sharedService.alert(erpfachequestatusid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpfabankaccountservice.geterpfabankaccountsList().then(res => 
{
this.bankidList = res as erpfabankaccount[];
}
);
this.configservice.getList("chequestatus").then(res => this.statusList = res as boconfigvalue[]);

//autocomplete
    this.erpfachequestatusservice.geterpfachequestatusesList().then(res => {
      this.pkList = res as erpfachequestatus[];
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
this.erpfachequestatusForm.markAsUntouched();
this.erpfachequestatusForm.markAsPristine();
}



resetForm() {
if (this.erpfachequestatusForm != null)
this.erpfachequestatusForm.reset();
this.erpfachequestatusForm.patchValue({
});
this.erpfachequestatusForm.patchValue({
issuedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
status: "R",
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let txnid = this.erpfachequestatusForm.get('txnid').value;
        if(txnid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpfachequestatusservice.deleteerpfachequestatus(txnid).then(res =>
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
    this.erpfachequestatusForm.patchValue({
        txnid: null
    });
    if(this.erpfachequestatusservice.formData.txnid!=null)this.erpfachequestatusservice.formData.txnid=null;
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
        else if(key=="issuedate")
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
        if(this.erpfachequestatusForm.controls[key]!=null)
{
this.erpfachequestatusForm.patchValue(json);
         if(bdisable)this.erpfachequestatusForm.controls[key].disable({onlySelf: true});
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
txnidonChange(evt:any){
let e=evt.value;
}
bankidonChange(evt:any){
let e=evt.value;
this.erpfachequestatusForm.patchValue({bankiddesc:evt.options[evt.options.selectedIndex].text});
}
chequenumberonChange(evt:any){
let e=evt.value;
}
issuedateonChange(evt:any){
let e=evt.value;
}
partyonChange(evt:any){
let e=evt.value;
}
amountonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=this.f.status.value as any;
this.erpfachequestatusForm.patchValue({statusdesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){this.erpfachequestatusservice.geterpfachequestatusesByEID(pkcol).then(res => {

this.erpfachequestatusservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.erpfachequestatus.txnid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.erpfachequestatus.txnid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpfachequestatusForm.patchValue({
txnid: res.erpfachequestatus.txnid,
bankid: res.erpfachequestatus.bankid,
bankiddesc: res.erpfachequestatus.bankiddesc,
chequenumber: res.erpfachequestatus.chequenumber,
issuedate: this.ngbDateParserFormatter.parse(res.erpfachequestatus.issuedate),
party: res.erpfachequestatus.party,
amount: res.erpfachequestatus.amount,
remarks: res.erpfachequestatus.remarks,
status: res.erpfachequestatus.status,
statusdesc: res.erpfachequestatus.statusdesc,
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
  for (let key in this.erpfachequestatusForm.controls) {
    if (this.erpfachequestatusForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpfachequestatusForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpfachequestatusForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpfachequestatusForm.value;
obj.issuedate=this.ngbDateParserFormatter.format(this.erpfachequestatusForm.get('issuedate').value);
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
Object.keys(this.erpfachequestatusForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpfachequestatusForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpfachequestatusForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpfachequestatusservice.formData=this.erpfachequestatusForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpfachequestatusForm.controls[key] != null)
    {
        this.erpfachequestatusservice.formData[key] = this.erpfachequestatusForm.controls[key].value;
    }
}
}
}
this.erpfachequestatusservice.formData.issuedate=new Date(this.ngbDateParserFormatter.format(this.erpfachequestatusForm.get('issuedate').value)+'  UTC');
console.log(this.erpfachequestatusservice.formData);
this.erpfachequestatusservice.formData=this.erpfachequestatusForm.value;
this.erpfachequestatusservice.saveOrUpdateerpfachequestatuses().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.erpfachequestatus);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpfachequestatusservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.erpfachequestatus);
}
else
{
this.FillData(res);
}
}
this.erpfachequestatusForm.markAsUntouched();
this.erpfachequestatusForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbankid( bankaccountid) {
/*let ScreenType='2';
this.dialog.open(erpfabankaccountComponent, 
{
data: {bankaccountid:this.erpfachequestatusForm.get('bankid').value, ScreenType:2 }
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



