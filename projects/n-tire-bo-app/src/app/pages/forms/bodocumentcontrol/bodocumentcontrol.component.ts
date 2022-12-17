import { bodocumentcontrolService } from './../../../service/bodocumentcontrol.service';
import { bodocumentcontrol } from './../../../model/bodocumentcontrol.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { dmsdocument} from '../../../../../../n-tire-dms-app/src/app/model/dmsdocument.model';
import { dmsdocumentService } from '../../../../../../n-tire-dms-app/src/app/service/dmsdocument.service';
//popups
import { bousermaster} from './../../../model/bousermaster.model';
import { bousermasterService } from './../../../service/bousermaster.service';
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
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-bodocumentcontrol',
templateUrl: './bodocumentcontrol.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bodocumentcontrolComponent implements OnInit {
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
bfilterPopulatebodocumentcontrols:boolean=false;
databodocumentcontrolsdocumentid3:any=[];
databodocumentcontrolsaction3:any=[];
databodocumentcontrolsuserid3:any=[];
 bodocumentcontrolForm: FormGroup;
documentidList: dmsdocument[];
documentidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
documentid_dmsdocumentsForm: FormGroup;//autocomplete
documentid_dmsdocumentsoptions:any;//autocomplete
documentid_dmsdocumentsformatter:any;//autocomplete
actionList: boconfigvalue[];
useridList: bousermaster[];
useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
userid_bousermastersForm: FormGroup;//autocomplete
userid_bousermastersoptions:any;//autocomplete
userid_bousermastersformatter:any;//autocomplete
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
private bodocumentcontrolservice: bodocumentcontrolService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private dmsdocumentservice:dmsdocumentService,
private bousermasterservice:bousermasterService,
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
this.bodocumentcontrolForm  = this.fb.group({pk:[null],controlid: [null],
documentid: [null],
documentiddesc: [null],
sourcefield: [null],
sourcereference: [null],
action: [null],
actiondesc: [null],
userid: [null],
useriddesc: [null],
actiondatetime: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bodocumentcontrolForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bodocumentcontrolForm.dirty && this.bodocumentcontrolForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.controlid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.controlid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.controlid && pkDetail) {
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
let bodocumentcontrolid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
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
this.formid=bodocumentcontrolid;
//this.sharedService.alert(bodocumentcontrolid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.dmsdocumentservice.getdmsdocumentsList().then(res => 
{
this.documentidList = res as dmsdocument[];
if(this.bodocumentcontrolservice.formData && this.bodocumentcontrolservice.formData.documentid){
this.documentidoptionsEvent.emit(this.documentidList);
this.bodocumentcontrolForm.patchValue({
    documentid: this.bodocumentcontrolservice.formData.documentid,
    documentiddesc: this.bodocumentcontrolservice.formData.documentiddesc,
});
}
{
let arrdocumentid = this.documentidList.filter(v => v.documentid == this.bodocumentcontrolForm.get('documentid').value);
let objdocumentid;
if (arrdocumentid.length > 0) objdocumentid = arrdocumentid[0];
if (objdocumentid)
{
}
}
}
).catch((err) => {console.log(err);});
this.documentid_dmsdocumentsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.documentidList.filter(v => v.reference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.documentid_dmsdocumentsformatter = (result: any) => result.reference;
this.configservice.getList("doccontrolaction").then(res => this.actionList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.useridList = res as bousermaster[];
if(this.bodocumentcontrolservice.formData && this.bodocumentcontrolservice.formData.userid){
this.useridoptionsEvent.emit(this.useridList);
this.bodocumentcontrolForm.patchValue({
    userid: this.bodocumentcontrolservice.formData.userid,
    useriddesc: this.bodocumentcontrolservice.formData.useriddesc,
});
}
{
let arruserid = this.useridList.filter(v => v.userid == this.bodocumentcontrolForm.get('userid').value);
let objuserid;
if (arruserid.length > 0) objuserid = arruserid[0];
if (objuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.userid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.useridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.userid_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.bodocumentcontrolservice.getbodocumentcontrolsList().then(res => {
      this.pkList = res as bodocumentcontrol[];
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
this.bodocumentcontrolForm.markAsUntouched();
this.bodocumentcontrolForm.markAsPristine();
}
onSelecteddocumentid(documentidDetail: any) {
if (documentidDetail.documentid && documentidDetail) {
this.bodocumentcontrolForm.patchValue({
documentid: documentidDetail.documentid,
documentiddesc: documentidDetail.reference,

});

}
}

onSelecteduserid(useridDetail: any) {
if (useridDetail.userid && useridDetail) {
this.bodocumentcontrolForm.patchValue({
userid: useridDetail.userid,
useriddesc: useridDetail.username,

});

}
}




resetForm() {
if (this.bodocumentcontrolForm != null)
this.bodocumentcontrolForm.reset();
this.bodocumentcontrolForm.patchValue({
userid: this.sessiondata.userid,
useriddesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.bodocumentcontrolForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let controlid = this.bodocumentcontrolForm.get('controlid').value;
        if(controlid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bodocumentcontrolservice.deletebodocumentcontrol(controlid).then(res =>
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
    this.bodocumentcontrolForm.patchValue({
        controlid: null
    });
    if(this.bodocumentcontrolservice.formData.controlid!=null)this.bodocumentcontrolservice.formData.controlid=null;
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
        else if(key=="actiondatetime")
this.bodocumentcontrolForm.patchValue({"actiondatetime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.bodocumentcontrolForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bodocumentcontrolForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bodocumentcontrolForm.controls[key]!=undefined)this.bodocumentcontrolForm.controls[key].disable({onlySelf: true});
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
controlidonChange(evt:any){
let e=evt.value;
}
documentidonChange(evt:any){
let e=evt.value;
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
actiononChange(evt:any){
let e=this.f.action.value as any;
this.bodocumentcontrolForm.patchValue({actiondesc:evt.options[evt.options.selectedIndex].text});
}
useridonChange(evt:any){
let e=evt.value;
}
actiondatetimeonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.bodocumentcontrolservice.getbodocumentcontrolsByEID(pkcol).then(res => {

this.bodocumentcontrolservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bodocumentcontrol.controlid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bodocumentcontrol.controlid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bodocumentcontrolForm.patchValue({
controlid: res.bodocumentcontrol.controlid,
documentid: res.bodocumentcontrol.documentid,
documentiddesc: res.bodocumentcontrol.documentiddesc,
sourcefield: res.bodocumentcontrol.sourcefield,
sourcereference: res.bodocumentcontrol.sourcereference,
action: res.bodocumentcontrol.action,
actiondesc: res.bodocumentcontrol.actiondesc,
userid: res.bodocumentcontrol.userid,
useriddesc: res.bodocumentcontrol.useriddesc,
actiondatetime: this.ngbDateParserFormatter.parse(res.bodocumentcontrol.actiondatetime),
status: res.bodocumentcontrol.status,
statusdesc: res.bodocumentcontrol.statusdesc,
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
  for (let key in this.bodocumentcontrolForm.controls) {
    if (this.bodocumentcontrolForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bodocumentcontrolForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bodocumentcontrolForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bodocumentcontrolForm.value;
obj.actiondatetime=new Date(this.bodocumentcontrolForm.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.bodocumentcontrolForm.get('actiondatetime').value)+'  UTC' :null);
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
Object.keys(this.bodocumentcontrolForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bodocumentcontrolForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bodocumentcontrolForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bodocumentcontrolservice.formData=this.bodocumentcontrolForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bodocumentcontrolForm.controls[key] != null)
    {
        this.bodocumentcontrolservice.formData[key] = this.bodocumentcontrolForm.controls[key].value;
    }
}
}
}
this.bodocumentcontrolservice.formData.actiondatetime=new Date(this.bodocumentcontrolForm.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.bodocumentcontrolForm.get('actiondatetime').value)+'  UTC' :null);
console.log(this.bodocumentcontrolservice.formData);
this.bodocumentcontrolservice.formData=this.bodocumentcontrolForm.value;
this.bodocumentcontrolservice.saveOrUpdatebodocumentcontrols().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bodocumentcontrol);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bodocumentcontrolservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bodocumentcontrol);
}
else
{
this.FillData(res);
}
}
this.bodocumentcontrolForm.markAsUntouched();
this.bodocumentcontrolForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditdocumentid( documentid) {
/*let ScreenType='2';
this.dialog.open(dmsdocumentComponent, 
{
data: {documentid:this.bodocumentcontrolForm.get('documentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdituserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.bodocumentcontrolForm.get('userid').value, ScreenType:2 }
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



