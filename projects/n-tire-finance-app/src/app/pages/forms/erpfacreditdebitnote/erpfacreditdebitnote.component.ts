import { erpfacreditdebitnoteService } from './../../../service/erpfacreditdebitnote.service';
import { erpfacreditdebitnote } from './../../../model/erpfacreditdebitnote.model';
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
import { erpfajournal} from './../../../model/erpfajournal.model';
import { erpfajournalService } from './../../../service/erpfajournal.service';
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
selector: 'app-erpfacreditdebitnote',
templateUrl: './erpfacreditdebitnote.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpfacreditdebitnoteComponent implements OnInit {
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
bfilterPopulateerpfacreditdebitnotes:boolean=false;
dataerpfacreditdebitnotestype3:any=[];
dataerpfacreditdebitnotesjournalid3:any=[];
 erpfacreditdebitnoteForm: FormGroup;
typeList: boconfigvalue[];
journalidList: erpfajournal[];
journalidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
journalid_erpfajournalsForm: FormGroup;//autocomplete
journalid_erpfajournalsoptions:any;//autocomplete
journalid_erpfajournalsformatter:any;//autocomplete
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
private erpfacreditdebitnoteservice: erpfacreditdebitnoteService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpfajournalservice:erpfajournalService,
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
this.erpfacreditdebitnoteForm  = this.fb.group({pk:[null],cdid: [null],
cdcode: [null],
type: [null],
typedesc: [null],
journalid: [null],
journaliddesc: [null],
journalamount: [null],
cdamount: [null],
cdremarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpfacreditdebitnoteForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpfacreditdebitnoteForm.dirty && this.erpfacreditdebitnoteForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.cdid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.cdid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.cdid && pkDetail) {
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
let erpfacreditdebitnoteid = null;

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
this.formid=erpfacreditdebitnoteid;
//this.sharedService.alert(erpfacreditdebitnoteid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("fatxntype").then(res => this.typeList = res as boconfigvalue[]);
this.erpfajournalservice.geterpfajournalsList().then(res => 
{
this.journalidList = res as erpfajournal[];
if(this.erpfacreditdebitnoteservice.formData && this.erpfacreditdebitnoteservice.formData.journalid){
this.journalidoptionsEvent.emit(this.journalidList);
this.erpfacreditdebitnoteForm.patchValue({
    journalid: this.erpfacreditdebitnoteservice.formData.journalid,
    journaliddesc: this.erpfacreditdebitnoteservice.formData.journaliddesc,
});
}
{
let arrjournalid = this.journalidList.filter(v => v.journalid == this.erpfacreditdebitnoteForm.get('journalid').value);
let objjournalid;
if (arrjournalid.length > 0) objjournalid = arrjournalid[0];
if (objjournalid)
{
}
}
}
);
this.journalid_erpfajournalsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.journalidList.filter(v => v.journalid.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.journalid_erpfajournalsformatter = (result: any) => result.journalid;

//autocomplete
    this.erpfacreditdebitnoteservice.geterpfacreditdebitnotesList().then(res => {
      this.pkList = res as erpfacreditdebitnote[];
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
this.erpfacreditdebitnoteForm.markAsUntouched();
this.erpfacreditdebitnoteForm.markAsPristine();
}
onSelectedjournalid(journalidDetail: any) {
if (journalidDetail.journalid && journalidDetail) {
this.erpfacreditdebitnoteForm.patchValue({
journalid: journalidDetail.journalid,
journaliddesc: journalidDetail.journalid,

});

}
}




resetForm() {
if (this.erpfacreditdebitnoteForm != null)
this.erpfacreditdebitnoteForm.reset();
this.erpfacreditdebitnoteForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let cdid = this.erpfacreditdebitnoteForm.get('cdid').value;
        if(cdid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpfacreditdebitnoteservice.deleteerpfacreditdebitnote(cdid).then(res =>
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
    this.erpfacreditdebitnoteForm.patchValue({
        cdid: null
    });
    if(this.erpfacreditdebitnoteservice.formData.cdid!=null)this.erpfacreditdebitnoteservice.formData.cdid=null;
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
        if(this.erpfacreditdebitnoteForm.controls[key]!=null)
{
this.erpfacreditdebitnoteForm.patchValue(json);
         if(bdisable)this.erpfacreditdebitnoteForm.controls[key].disable({onlySelf: true});
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
cdidonChange(evt:any){
let e=evt.value;
}
cdcodeonChange(evt:any){
let e=evt.value;
}
typeonChange(evt:any){
let e=this.f.type.value as any;
this.erpfacreditdebitnoteForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
journalidonChange(evt:any){
let e=evt.value;
}
journalamountonChange(evt:any){
let e=evt.value;
}
cdamountonChange(evt:any){
let e=evt.value;
}
cdremarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){this.erpfacreditdebitnoteservice.geterpfacreditdebitnotesByEID(pkcol).then(res => {

this.erpfacreditdebitnoteservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.erpfacreditdebitnote.cdid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.erpfacreditdebitnote.cdid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpfacreditdebitnoteForm.patchValue({
cdid: res.erpfacreditdebitnote.cdid,
cdcode: res.erpfacreditdebitnote.cdcode,
type: res.erpfacreditdebitnote.type,
typedesc: res.erpfacreditdebitnote.typedesc,
journalid: res.erpfacreditdebitnote.journalid,
journaliddesc: res.erpfacreditdebitnote.journaliddesc,
journalamount: res.erpfacreditdebitnote.journalamount,
cdamount: res.erpfacreditdebitnote.cdamount,
cdremarks: res.erpfacreditdebitnote.cdremarks,
status: res.erpfacreditdebitnote.status,
statusdesc: res.erpfacreditdebitnote.statusdesc,
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
  for (let key in this.erpfacreditdebitnoteForm.controls) {
    if (this.erpfacreditdebitnoteForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpfacreditdebitnoteForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpfacreditdebitnoteForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpfacreditdebitnoteForm.value;
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
Object.keys(this.erpfacreditdebitnoteForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpfacreditdebitnoteForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpfacreditdebitnoteForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpfacreditdebitnoteservice.formData=this.erpfacreditdebitnoteForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpfacreditdebitnoteForm.controls[key] != null)
    {
        this.erpfacreditdebitnoteservice.formData[key] = this.erpfacreditdebitnoteForm.controls[key].value;
    }
}
}
}
console.log(this.erpfacreditdebitnoteservice.formData);
this.erpfacreditdebitnoteservice.formData=this.erpfacreditdebitnoteForm.value;
this.erpfacreditdebitnoteservice.saveOrUpdateerpfacreditdebitnotes().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.erpfacreditdebitnote);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpfacreditdebitnoteservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.erpfacreditdebitnote);
}
else
{
this.FillData(res);
}
}
this.erpfacreditdebitnoteForm.markAsUntouched();
this.erpfacreditdebitnoteForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditjournalid( journalid) {
/*let ScreenType='2';
this.dialog.open(erpfajournalComponent, 
{
data: {journalid:this.erpfacreditdebitnoteForm.get('journalid').value, ScreenType:2 }
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



