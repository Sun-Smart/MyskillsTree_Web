import { dmsaudittrailService } from './../../../service/dmsaudittrail.service';
import { dmsaudittrail } from './../../../model/dmsaudittrail.model';
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
import { dmsdocument} from './../../../model/dmsdocument.model';
import { dmsdocumentComponent } from './../../../pages/forms/dmsdocument/dmsdocument.component';
import { dmsdocumentService } from './../../../service/dmsdocument.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-dmsaudittrail',
templateUrl: './dmsaudittrail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class dmsaudittrailComponent implements OnInit {
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
bfilterPopulatedmsaudittrails:boolean=false;
datadmsaudittrailsdocumentid3:any=[];
datadmsaudittrailsuserid3:any=[];
datadmsaudittrailsaction3:any=[];
 dmsaudittrailForm: FormGroup;
documentidList: dmsdocument[];
documentidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
documentid_dmsdocumentsForm: FormGroup;//autocomplete
documentid_dmsdocumentsoptions:any;//autocomplete
documentid_dmsdocumentsformatter:any;//autocomplete
useridList: bousermaster[];
useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
userid_bousermastersForm: FormGroup;//autocomplete
userid_bousermastersoptions:any;//autocomplete
userid_bousermastersformatter:any;//autocomplete
actionList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
dmsaudittrailshowOption:boolean;
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
private dmsaudittrailservice: dmsaudittrailService,
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
this.dmsaudittrailForm  = this.fb.group({
pk:[null],
audittrailid: [null],
documentid: [null],
documentiddesc: [null],
versionnumber: [null],
userid: [null],
useriddesc: [null],
action: [null],
actiondesc: [null],
actiondate: [null],
actiondetails: [null],
comment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.dmsaudittrailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.dmsaudittrailForm.dirty && this.dmsaudittrailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.audittrailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.audittrailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.audittrailid && pkDetail) {
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
let dmsaudittrailid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
  this.pkcol = this.sessionService.getItem('usersource');
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
this.formid=dmsaudittrailid;
//this.sharedService.alert(dmsaudittrailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.dmsdocumentservice.getdmsdocumentsList().then(res => 
{
this.documentidList = res as dmsdocument[];
if(this.dmsaudittrailservice.formData && this.dmsaudittrailservice.formData.documentid){
this.documentidoptionsEvent.emit(this.documentidList);
this.dmsaudittrailForm.patchValue({
    documentid: this.dmsaudittrailservice.formData.documentid,
    documentiddesc: this.dmsaudittrailservice.formData.documentiddesc,
});
}
{
let arrdocumentid = this.documentidList.filter(v => v.documentid == this.dmsaudittrailForm.get('documentid').value);
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
this.bousermasterservice.getbousermastersList().then(res => 
{
this.useridList = res as bousermaster[];
if(this.dmsaudittrailservice.formData && this.dmsaudittrailservice.formData.userid){
this.useridoptionsEvent.emit(this.useridList);
this.dmsaudittrailForm.patchValue({
    userid: this.dmsaudittrailservice.formData.userid,
    useriddesc: this.dmsaudittrailservice.formData.useriddesc,
});
}
{
let arruserid = this.useridList.filter(v => v.userid == this.dmsaudittrailForm.get('userid').value);
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
this.configservice.getList("auditaction").then(res => this.actionList = res as boconfigvalue[]);

//autocomplete
    this.dmsaudittrailservice.getdmsaudittrailsList().then(res => {
      this.pkList = res as dmsaudittrail[];
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
this.dmsaudittrailForm.markAsUntouched();
this.dmsaudittrailForm.markAsPristine();
}
onSelecteddocumentid(documentidDetail: any) {
if (documentidDetail.documentid && documentidDetail) {
this.dmsaudittrailForm.patchValue({
documentid: documentidDetail.documentid,
documentiddesc: documentidDetail.reference,

});

}
}

onSelecteduserid(useridDetail: any) {
if (useridDetail.userid && useridDetail) {
this.dmsaudittrailForm.patchValue({
userid: useridDetail.userid,
useriddesc: useridDetail.username,

});

}
}




resetForm() {
if (this.dmsaudittrailForm != null)
this.dmsaudittrailForm.reset();
this.dmsaudittrailForm.patchValue({
userid: this.sessiondata.userid,
useriddesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let audittrailid = this.dmsaudittrailForm.get('audittrailid').value;
        if(audittrailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.dmsaudittrailservice.deletedmsaudittrail(audittrailid).then(res =>
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
    this.dmsaudittrailForm.patchValue({
        audittrailid: null
    });
    if(this.dmsaudittrailservice.formData.audittrailid!=null)this.dmsaudittrailservice.formData.audittrailid=null;
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
        else if(key=="actiondate")
this.dmsaudittrailForm.patchValue({"actiondate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.dmsaudittrailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.dmsaudittrailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.dmsaudittrailForm.controls[key]!=undefined)
{
this.dmsaudittrailForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
{
    this.onSubmitData(true);
}
else if( (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
audittrailidonChange(evt:any){
let e=evt.value;
}
documentidonChange(evt:any){
let e=evt.value;
}
versionnumberonChange(evt:any){
let e=evt.value;
}
useridonChange(evt:any){
let e=evt.value;
}
actiononChange(evt:any){
let e=this.f.action.value as any;
this.dmsaudittrailForm.patchValue({actiondesc:evt.options[evt.options.selectedIndex].text});
}
actiondateonChange(evt:any){
let e=evt.value;
}
actiondetailsonChange(evt:any){
let e=evt.value;
}
commentonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editdmsaudittrails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.dmsaudittrailservice.getdmsaudittrailsByEID(pkcol).then(res => {

this.dmsaudittrailservice.formData=res.dmsaudittrail;
let formproperty=res.dmsaudittrail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.dmsaudittrail.pkcol;
this.formid=res.dmsaudittrail.audittrailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.dmsaudittrailservice.formData=res.dmsaudittrail;
this.formid=res.dmsaudittrail.audittrailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.dmsaudittrailForm.patchValue({
audittrailid: res.dmsaudittrail.audittrailid,
documentid: res.dmsaudittrail.documentid,
documentiddesc: res.dmsaudittrail.documentiddesc,
versionnumber: res.dmsaudittrail.versionnumber,
userid: res.dmsaudittrail.userid,
useriddesc: res.dmsaudittrail.useriddesc,
action: res.dmsaudittrail.action,
actiondesc: res.dmsaudittrail.actiondesc,
actiondate: this.ngbDateParserFormatter.parse(res.dmsaudittrail.actiondate),
actiondetails: res.dmsaudittrail.actiondetails,
comment: res.dmsaudittrail.comment,
status: res.dmsaudittrail.status,
statusdesc: res.dmsaudittrail.statusdesc,
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
  for (let key in this.dmsaudittrailForm.controls) {
    if (this.dmsaudittrailForm.controls[key] != null) {
if(false)
{
if(this.dmsaudittrailservice.formData!=null && this.dmsaudittrailservice.formData[key]!=null  && this.dmsaudittrailservice.formData[key]!='[]' && this.dmsaudittrailservice.formData[key]!=undefined && this.dmsaudittrailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.dmsaudittrailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.dmsaudittrailservice.formData!=null && this.dmsaudittrailservice.formData[key]!=null   && this.dmsaudittrailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.dmsaudittrailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.dmsaudittrailservice.formData!=null && this.dmsaudittrailservice.formData[key]!=null   && this.dmsaudittrailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.dmsaudittrailservice.formData[key]+"'><div class='progress__number'>"+this.dmsaudittrailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.dmsaudittrailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.dmsaudittrailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.dmsaudittrailForm.value;
obj.actiondate=new Date(this.dmsaudittrailForm.get('actiondate').value ? this.ngbDateParserFormatter.format(this.dmsaudittrailForm.get('actiondate').value)+'  UTC' :null);
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

private dmsaudittrailtoggleOption(){
this.dmsaudittrailshowOption = this.dmsaudittrailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.dmsaudittrailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.dmsaudittrailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.dmsaudittrailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.dmsaudittrailservice.formData=this.dmsaudittrailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.dmsaudittrailForm.controls[key] != null)
    {
        this.dmsaudittrailservice.formData[key] = this.dmsaudittrailForm.controls[key].value;
    }
}
}
}
this.dmsaudittrailservice.formData.actiondate=new Date(this.dmsaudittrailForm.get('actiondate').value ? this.ngbDateParserFormatter.format(this.dmsaudittrailForm.get('actiondate').value)+'  UTC' :null);
console.log(this.dmsaudittrailservice.formData);
this.dmsaudittrailservice.formData=this.dmsaudittrailForm.value;
this.dmsaudittrailservice.saveOrUpdatedmsaudittrails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsaudittrail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.dmsaudittrailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsaudittrail);
}
else
{
this.FillData(res);
}
}
this.dmsaudittrailForm.markAsUntouched();
this.dmsaudittrailForm.markAsPristine();
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
data: {documentid:this.dmsaudittrailForm.get('documentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdituserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.dmsaudittrailForm.get('userid').value, ScreenType:2 }
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



