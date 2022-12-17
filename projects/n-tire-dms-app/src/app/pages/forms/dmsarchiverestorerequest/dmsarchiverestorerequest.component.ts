import { dmsarchiverestorerequestService } from './../../../service/dmsarchiverestorerequest.service';
import { dmsarchiverestorerequest } from './../../../model/dmsarchiverestorerequest.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { dmsdocument} from './../../../model/dmsdocument.model';
import { dmsdocumentComponent } from './../../../pages/forms/dmsdocument/dmsdocument.component';
import { dmsdocumentService } from './../../../service/dmsdocument.service';
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
selector: 'app-dmsarchiverestorerequest',
templateUrl: './dmsarchiverestorerequest.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class dmsarchiverestorerequestComponent implements OnInit {
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
bfilterPopulatedmsarchiverestorerequests:boolean=false;
datadmsarchiverestorerequestsadminuserid3:any=[];
datadmsarchiverestorerequestsdocumentid3:any=[];
 dmsarchiverestorerequestForm: FormGroup;
adminuseridList: bousermaster[];
adminuseridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
adminuserid_bousermastersForm: FormGroup;//autocomplete
adminuserid_bousermastersoptions:any;//autocomplete
adminuserid_bousermastersformatter:any;//autocomplete
documentidList: dmsdocument[];
documentidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
documentid_dmsdocumentsForm: FormGroup;//autocomplete
documentid_dmsdocumentsoptions:any;//autocomplete
documentid_dmsdocumentsformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
dmsarchiverestorerequestshowOption:boolean;
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
private dmsarchiverestorerequestservice: dmsarchiverestorerequestService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
private dmsdocumentservice:dmsdocumentService,
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
this.dmsarchiverestorerequestForm  = this.fb.group({
pk:[null],
requestid: [null],
requesteddate: [null],
requestuserid: [null],
adminuserid: [null],
adminuseriddesc: [null],
documentid: [null],
documentiddesc: [null],
comments: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.dmsarchiverestorerequestForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.dmsarchiverestorerequestForm.dirty && this.dmsarchiverestorerequestForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.requestid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.requestid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.requestid && pkDetail) {
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
let dmsarchiverestorerequestid = null;

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
this.formid=dmsarchiverestorerequestid;
//this.sharedService.alert(dmsarchiverestorerequestid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.adminuseridList = res as bousermaster[];
if(this.dmsarchiverestorerequestservice.formData && this.dmsarchiverestorerequestservice.formData.adminuserid){
this.adminuseridoptionsEvent.emit(this.adminuseridList);
this.dmsarchiverestorerequestForm.patchValue({
    adminuserid: this.dmsarchiverestorerequestservice.formData.adminuserid,
    adminuseriddesc: this.dmsarchiverestorerequestservice.formData.adminuseriddesc,
});
}
{
let arradminuserid = this.adminuseridList.filter(v => v.userid == this.dmsarchiverestorerequestForm.get('adminuserid').value);
let objadminuserid;
if (arradminuserid.length > 0) objadminuserid = arradminuserid[0];
if (objadminuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.adminuserid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.adminuseridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.adminuserid_bousermastersformatter = (result: any) => result.username;
this.dmsdocumentservice.getdmsdocumentsList().then(res => 
{
this.documentidList = res as dmsdocument[];
if(this.dmsarchiverestorerequestservice.formData && this.dmsarchiverestorerequestservice.formData.documentid){
this.documentidoptionsEvent.emit(this.documentidList);
this.dmsarchiverestorerequestForm.patchValue({
    documentid: this.dmsarchiverestorerequestservice.formData.documentid,
    documentiddesc: this.dmsarchiverestorerequestservice.formData.documentiddesc,
});
}
{
let arrdocumentid = this.documentidList.filter(v => v.documentid == this.dmsarchiverestorerequestForm.get('documentid').value);
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

//autocomplete
    this.dmsarchiverestorerequestservice.getdmsarchiverestorerequestsList().then(res => {
      this.pkList = res as dmsarchiverestorerequest[];
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
this.dmsarchiverestorerequestForm.markAsUntouched();
this.dmsarchiverestorerequestForm.markAsPristine();
}
onSelectedadminuserid(adminuseridDetail: any) {
if (adminuseridDetail.userid && adminuseridDetail) {
this.dmsarchiverestorerequestForm.patchValue({
adminuserid: adminuseridDetail.userid,
adminuseriddesc: adminuseridDetail.username,

});

}
}

onSelecteddocumentid(documentidDetail: any) {
if (documentidDetail.documentid && documentidDetail) {
this.dmsarchiverestorerequestForm.patchValue({
documentid: documentidDetail.documentid,
documentiddesc: documentidDetail.reference,

});

}
}




resetForm() {
if (this.dmsarchiverestorerequestForm != null)
this.dmsarchiverestorerequestForm.reset();
this.dmsarchiverestorerequestForm.patchValue({
adminuserid: this.sessiondata.userid,
adminuseriddesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let requestid = this.dmsarchiverestorerequestForm.get('requestid').value;
        if(requestid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.dmsarchiverestorerequestservice.deletedmsarchiverestorerequest(requestid).then(res =>
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
    this.dmsarchiverestorerequestForm.patchValue({
        requestid: null
    });
    if(this.dmsarchiverestorerequestservice.formData.requestid!=null)this.dmsarchiverestorerequestservice.formData.requestid=null;
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
        else if(key=="requesteddate")
this.dmsarchiverestorerequestForm.patchValue({"requesteddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="comments")
this.dmsarchiverestorerequestForm.patchValue({"comments":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.dmsarchiverestorerequestForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.dmsarchiverestorerequestForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.dmsarchiverestorerequestForm.controls[key]!=undefined)
{
this.dmsarchiverestorerequestForm.controls[key].disable({onlySelf: true});
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
requestidonChange(evt:any){
let e=evt.value;
}
requesteddateonChange(evt:any){
let e=evt.value;
}
requestuseridonChange(evt:any){
let e=evt.value;
}
adminuseridonChange(evt:any){
let e=evt.value;
}
documentidonChange(evt:any){
let e=evt.value;
}
commentsonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editdmsarchiverestorerequests() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.dmsarchiverestorerequestservice.getdmsarchiverestorerequestsByEID(pkcol).then(res => {

this.dmsarchiverestorerequestservice.formData=res.dmsarchiverestorerequest;
let formproperty=res.dmsarchiverestorerequest.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.dmsarchiverestorerequest.pkcol;
this.formid=res.dmsarchiverestorerequest.requestid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.dmsarchiverestorerequestservice.formData=res.dmsarchiverestorerequest;
this.formid=res.dmsarchiverestorerequest.requestid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.dmsarchiverestorerequestForm.patchValue({
requestid: res.dmsarchiverestorerequest.requestid,
requesteddate: this.ngbDateParserFormatter.parse(res.dmsarchiverestorerequest.requesteddate),
requestuserid: res.dmsarchiverestorerequest.requestuserid,
adminuserid: res.dmsarchiverestorerequest.adminuserid,
adminuseriddesc: res.dmsarchiverestorerequest.adminuseriddesc,
documentid: res.dmsarchiverestorerequest.documentid,
documentiddesc: res.dmsarchiverestorerequest.documentiddesc,
comments: JSON.parse(res.dmsarchiverestorerequest.comments),
status: res.dmsarchiverestorerequest.status,
statusdesc: res.dmsarchiverestorerequest.statusdesc,
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
  for (let key in this.dmsarchiverestorerequestForm.controls) {
    if (this.dmsarchiverestorerequestForm.controls[key] != null) {
if(false)
{
if(this.dmsarchiverestorerequestservice.formData!=null && this.dmsarchiverestorerequestservice.formData[key]!=null  && this.dmsarchiverestorerequestservice.formData[key]!='[]' && this.dmsarchiverestorerequestservice.formData[key]!=undefined && this.dmsarchiverestorerequestservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.dmsarchiverestorerequestservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.dmsarchiverestorerequestservice.formData!=null && this.dmsarchiverestorerequestservice.formData[key]!=null   && this.dmsarchiverestorerequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.dmsarchiverestorerequestservice.formData[key]+"></div>");
}
else if(false)
{
if(this.dmsarchiverestorerequestservice.formData!=null && this.dmsarchiverestorerequestservice.formData[key]!=null   && this.dmsarchiverestorerequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.dmsarchiverestorerequestservice.formData[key]+"'><div class='progress__number'>"+this.dmsarchiverestorerequestservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.dmsarchiverestorerequestForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.dmsarchiverestorerequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.dmsarchiverestorerequestForm.value;
obj.requesteddate=new Date(this.dmsarchiverestorerequestForm.get('requesteddate').value ? this.ngbDateParserFormatter.format(this.dmsarchiverestorerequestForm.get('requesteddate').value)+'  UTC' :null);
if(this.dmsarchiverestorerequestForm.get('comments').value!=null)obj.comments=JSON.stringify(this.dmsarchiverestorerequestForm.get('comments').value);
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

private dmsarchiverestorerequesttoggleOption(){
this.dmsarchiverestorerequestshowOption = this.dmsarchiverestorerequestshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.dmsarchiverestorerequestForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.dmsarchiverestorerequestForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.dmsarchiverestorerequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.dmsarchiverestorerequestservice.formData=this.dmsarchiverestorerequestForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.dmsarchiverestorerequestForm.controls[key] != null)
    {
        this.dmsarchiverestorerequestservice.formData[key] = this.dmsarchiverestorerequestForm.controls[key].value;
    }
}
}
}
this.dmsarchiverestorerequestservice.formData.requesteddate=new Date(this.dmsarchiverestorerequestForm.get('requesteddate').value ? this.ngbDateParserFormatter.format(this.dmsarchiverestorerequestForm.get('requesteddate').value)+'  UTC' :null);
if(this.dmsarchiverestorerequestForm.get('comments').value!=null)this.dmsarchiverestorerequestservice.formData.comments=JSON.stringify(this.dmsarchiverestorerequestForm.get('comments').value);
console.log(this.dmsarchiverestorerequestservice.formData);
this.dmsarchiverestorerequestservice.formData=this.dmsarchiverestorerequestForm.value;
this.dmsarchiverestorerequestservice.saveOrUpdatedmsarchiverestorerequests().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsarchiverestorerequest);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.dmsarchiverestorerequestservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsarchiverestorerequest);
}
else
{
this.FillData(res);
}
}
this.dmsarchiverestorerequestForm.markAsUntouched();
this.dmsarchiverestorerequestForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditadminuserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.dmsarchiverestorerequestForm.get('adminuserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdocumentid( documentid) {
/*let ScreenType='2';
this.dialog.open(dmsdocumentComponent, 
{
data: {documentid:this.dmsarchiverestorerequestForm.get('documentid').value, ScreenType:2 }
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



