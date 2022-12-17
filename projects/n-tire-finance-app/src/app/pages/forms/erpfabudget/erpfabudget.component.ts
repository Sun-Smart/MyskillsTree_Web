import { erpfabudgetService } from './../../../service/erpfabudget.service';
import { erpfabudget } from './../../../model/erpfabudget.model';
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
selector: 'app-erpfabudget',
templateUrl: './erpfabudget.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpfabudgetComponent implements OnInit {
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
data3:any=[];
bfilterPopulateerpfabudgets:boolean=false;
dataerpfabudgetsfinyearid3:any=[];
dataerpfabudgetsperiodrange3:any=[];
 erpfabudgetForm: FormGroup;
finyearidList: bofinancialyear[];
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
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpfabudgetservice: erpfabudgetService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bofinancialyearservice:bofinancialyearService,
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
this.erpfabudgetForm  = this.fb.group({pk:[null],ImageName: [null],
budgetid: [null],
budgetname: [null],
finyearid: [null],
finyeariddesc: [null],
currency: [null],
budgetstartdate: [null],
periodrange: [null],
periodrangedesc: [null],
accountid: [null],
controltype: [null],
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

get f() { return this.erpfabudgetForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpfabudgetForm.dirty && this.erpfabudgetForm.touched ) {
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

debugger;
let erpfabudgetid = null;

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
this.formid=erpfabudgetid;
//this.sharedService.alert(erpfabudgetid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bofinancialyearservice.getbofinancialyearsList().then(res => 
{
this.finyearidList = res as bofinancialyear[];
}
);
this.configservice.getList("periodrange").then(res => this.periodrangeList = res as boconfigvalue[]);

//autocomplete
    this.erpfabudgetservice.geterpfabudgetsList().then(res => {
      this.pkList = res as erpfabudget[];
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
this.erpfabudgetForm.markAsUntouched();
this.erpfabudgetForm.markAsPristine();
}



resetForm() {
if (this.erpfabudgetForm != null)
this.erpfabudgetForm.reset();
this.erpfabudgetForm.patchValue({
finyearid: this.sessiondata.finyearid,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let budgetid = this.erpfabudgetForm.get('budgetid').value;
        if(budgetid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpfabudgetservice.deleteerpfabudget(budgetid).then(res =>
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
    this.erpfabudgetForm.patchValue({
        budgetid: null
    });
    if(this.erpfabudgetservice.formData.budgetid!=null)this.erpfabudgetservice.formData.budgetid=null;
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
        if(this.erpfabudgetForm.controls[key]!=null)
{
this.erpfabudgetForm.patchValue(json);
         if(bdisable)this.erpfabudgetForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpfabudgets",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


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
budgetidonChange(evt:any){
let e=evt.value;
}
budgetnameonChange(evt:any){
let e=evt.value;
}
finyearidonChange(evt:any){
let e=evt.value;
this.erpfabudgetForm.patchValue({finyeariddesc:evt.options[evt.options.selectedIndex].text});
}
currencyonChange(evt:any){
let e=evt.value;
}
budgetstartdateonChange(evt:any){
let e=evt.value;
}
periodrangeonChange(evt:any){
let e=this.f.periodrange.value as any;
this.erpfabudgetForm.patchValue({periodrangedesc:evt.options[evt.options.selectedIndex].text});
}
accountidonChange(evt:any){
let e=evt.value;
}
controltypeonChange(evt:any){
let e=evt.value;
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
  


async PopulateScreen(pkcol:any){this.erpfabudgetservice.geterpfabudgetsByEID(pkcol).then(res => {

this.erpfabudgetservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.erpfabudget.budgetid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.erpfabudget.budgetid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpfabudgetForm.patchValue({
budgetid: res.erpfabudget.budgetid,
budgetname: res.erpfabudget.budgetname,
finyearid: res.erpfabudget.finyearid,
finyeariddesc: res.erpfabudget.finyeariddesc,
currency: res.erpfabudget.currency,
budgetstartdate: this.ngbDateParserFormatter.parse(res.erpfabudget.budgetstartdate),
periodrange: res.erpfabudget.periodrange,
periodrangedesc: res.erpfabudget.periodrangedesc,
accountid: res.erpfabudget.accountid,
controltype: res.erpfabudget.controltype,
yearlybudgetamount: res.erpfabudget.yearlybudgetamount,
halfyearlybudgetamount1: res.erpfabudget.halfyearlybudgetamount1,
halfyearlybudgetamount2: res.erpfabudget.halfyearlybudgetamount2,
quaterlyyearlybudgetamount1: res.erpfabudget.quaterlyyearlybudgetamount1,
quaterlyyearlybudgetamount2: res.erpfabudget.quaterlyyearlybudgetamount2,
quaterlyyearlybudgetamount3: res.erpfabudget.quaterlyyearlybudgetamount3,
quaterlyyearlybudgetamount4: res.erpfabudget.quaterlyyearlybudgetamount4,
monthlyyearlybudgetamount1: res.erpfabudget.monthlyyearlybudgetamount1,
monthlyyearlybudgetamount2: res.erpfabudget.monthlyyearlybudgetamount2,
monthlyyearlybudgetamount3: res.erpfabudget.monthlyyearlybudgetamount3,
monthlyyearlybudgetamount4: res.erpfabudget.monthlyyearlybudgetamount4,
monthlyyearlybudgetamount5: res.erpfabudget.monthlyyearlybudgetamount5,
monthlyyearlybudgetamount6: res.erpfabudget.monthlyyearlybudgetamount6,
monthlyyearlybudgetamount7: res.erpfabudget.monthlyyearlybudgetamount7,
monthlyyearlybudgetamount8: res.erpfabudget.monthlyyearlybudgetamount8,
monthlyyearlybudgetamount9: res.erpfabudget.monthlyyearlybudgetamount9,
monthlyyearlybudgetamount10: res.erpfabudget.monthlyyearlybudgetamount10,
monthlyyearlybudgetamount11: res.erpfabudget.monthlyyearlybudgetamount11,
monthlyyearlybudgetamount12: res.erpfabudget.monthlyyearlybudgetamount12,
customfield: res.erpfabudget.customfield,
attachment: res.erpfabudget.attachment,
status: res.erpfabudget.status,
statusdesc: res.erpfabudget.statusdesc,
});
if(this.erpfabudgetForm.get('customfield').value!=null && this.erpfabudgetForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpfabudgetForm.get('customfield').value);
this.FillCustomField();
if(this.erpfabudgetForm.get('attachment').value!=null && this.erpfabudgetForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.erpfabudgetForm.get('attachment').value));
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
  for (let key in this.erpfabudgetForm.controls) {
    if (this.erpfabudgetForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpfabudgetForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpfabudgetForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpfabudgetForm.value;
obj.budgetstartdate=this.ngbDateParserFormatter.format(this.erpfabudgetForm.get('budgetstartdate').value);
obj.customfield=JSON.stringify(customfields);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
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
Object.keys(this.erpfabudgetForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpfabudgetForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpfabudgetForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpfabudgetservice.formData=this.erpfabudgetForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpfabudgetForm.controls[key] != null)
    {
        this.erpfabudgetservice.formData[key] = this.erpfabudgetForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpfabudgetservice.formData.budgetstartdate=new Date(this.ngbDateParserFormatter.format(this.erpfabudgetForm.get('budgetstartdate').value)+'  UTC');
this.erpfabudgetservice.formData.customfield=JSON.stringify(customfields);
this.erpfabudgetservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpfabudgetservice.formData);
this.erpfabudgetservice.formData=this.erpfabudgetForm.value;
this.erpfabudgetservice.saveOrUpdateerpfabudgets().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.erpfabudget);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpfabudgetservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.erpfabudget);
}
else
{
this.FillData(res);
}
}
this.erpfabudgetForm.markAsUntouched();
this.erpfabudgetForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditfinyearid( finyearid) {
/*let ScreenType='2';
this.dialog.open(bofinancialyearComponent, 
{
data: {finyearid:this.erpfabudgetForm.get('finyearid').value, ScreenType:2 }
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



