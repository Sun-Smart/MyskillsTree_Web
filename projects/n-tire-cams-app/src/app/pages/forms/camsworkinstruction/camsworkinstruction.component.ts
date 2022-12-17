import { camsworkinstructionService } from './../../../service/camsworkinstruction.service';
import { camsworkinstruction } from './../../../model/camsworkinstruction.model';
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
import { camsworkdetail} from './../../../model/camsworkdetail.model';
import { camsworkdetailComponent } from './../../../pages/forms/camsworkdetail/camsworkdetail.component';
import { camsworkdetailService } from './../../../service/camsworkdetail.service';
//popups
import { camsworkorder} from './../../../model/camsworkorder.model';
import { camsworkorderComponent } from './../../../pages/forms/camsworkorder/camsworkorder.component';
import { camsworkorderService } from './../../../service/camsworkorder.service';
//popups
import { camspmmaster} from './../../../model/camspmmaster.model';
import { camspmmasterComponent } from './../../../pages/forms/camspmmaster/camspmmaster.component';
import { camspmmasterService } from './../../../service/camspmmaster.service';
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
selector: 'app-camsworkinstruction',
templateUrl: './camsworkinstruction.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsworkinstructionComponent implements OnInit {
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
bfilterPopulatecamsworkinstructions:boolean=false;
datacamsworkinstructionsworkorderdetailid3:any=[];
datacamsworkinstructionsworkorderid3:any=[];
datacamsworkinstructionspmid3:any=[];
 camsworkinstructionForm: FormGroup;
workorderdetailidList: camsworkdetail[];
workorderdetailidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
workorderdetailid_camsworkdetailsForm: FormGroup;//autocomplete
workorderdetailid_camsworkdetailsoptions:any;//autocomplete
workorderdetailid_camsworkdetailsformatter:any;//autocomplete
workorderidList: camsworkorder[];
workorderidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
workorderid_camsworkordersForm: FormGroup;//autocomplete
workorderid_camsworkordersoptions:any;//autocomplete
workorderid_camsworkordersformatter:any;//autocomplete
pmidList: camspmmaster[];
pmidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
pmid_camspmmastersForm: FormGroup;//autocomplete
pmid_camspmmastersoptions:any;//autocomplete
pmid_camspmmastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
camsworkinstructionshowOption:boolean;
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
private camsworkinstructionservice: camsworkinstructionService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camsworkdetailservice:camsworkdetailService,
private camsworkorderservice:camsworkorderService,
private camspmmasterservice:camspmmasterService,
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
this.camsworkinstructionForm  = this.fb.group({
pk:[null],
workinstructionid: [null],
workorderdetailid: [null],
workorderdetailiddesc: [null],
workorderid: [null],
workorderiddesc: [null],
scheduleid: [null],
scheduletaskid: [null],
pmid: [null],
pmiddesc: [null],
pmtaskid: [null],
pminstructionid: [null],
sequence: [null],
code: [null],
details: [null, Validators.required],
verified: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsworkinstructionForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsworkinstructionForm.dirty && this.camsworkinstructionForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.workinstructionid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.workinstructionid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.workinstructionid && pkDetail) {
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
let camsworkinstructionid = null;

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
this.formid=camsworkinstructionid;
//this.sharedService.alert(camsworkinstructionid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camsworkdetailservice.getcamsworkdetailsList().then(res => 
{
this.workorderdetailidList = res as camsworkdetail[];
if(this.camsworkinstructionservice.formData && this.camsworkinstructionservice.formData.workorderdetailid){
this.workorderdetailidoptionsEvent.emit(this.workorderdetailidList);
this.camsworkinstructionForm.patchValue({
    workorderdetailid: this.camsworkinstructionservice.formData.workorderdetailid,
    workorderdetailiddesc: this.camsworkinstructionservice.formData.workorderdetailiddesc,
});
}
{
let arrworkorderdetailid = this.workorderdetailidList.filter(v => v.workorderdetailid == this.camsworkinstructionForm.get('workorderdetailid').value);
let objworkorderdetailid;
if (arrworkorderdetailid.length > 0) objworkorderdetailid = arrworkorderdetailid[0];
if (objworkorderdetailid)
{
}
}
}
).catch((err) => {console.log(err);});
this.workorderdetailid_camsworkdetailsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.workorderdetailidList.filter(v => v.taskdescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.workorderdetailid_camsworkdetailsformatter = (result: any) => result.taskdescription;
this.camsworkorderservice.getcamsworkordersList().then(res => 
{
this.workorderidList = res as camsworkorder[];
if(this.camsworkinstructionservice.formData && this.camsworkinstructionservice.formData.workorderid){
this.workorderidoptionsEvent.emit(this.workorderidList);
this.camsworkinstructionForm.patchValue({
    workorderid: this.camsworkinstructionservice.formData.workorderid,
    workorderiddesc: this.camsworkinstructionservice.formData.workorderiddesc,
});
}
{
let arrworkorderid = this.workorderidList.filter(v => v.workorderid == this.camsworkinstructionForm.get('workorderid').value);
let objworkorderid;
if (arrworkorderid.length > 0) objworkorderid = arrworkorderid[0];
if (objworkorderid)
{
}
}
}
).catch((err) => {console.log(err);});
this.workorderid_camsworkordersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.workorderidList.filter(v => v.requestreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.workorderid_camsworkordersformatter = (result: any) => result.requestreference;
this.camspmmasterservice.getcamspmmastersList().then(res => 
{
this.pmidList = res as camspmmaster[];
if(this.camsworkinstructionservice.formData && this.camsworkinstructionservice.formData.pmid){
this.pmidoptionsEvent.emit(this.pmidList);
this.camsworkinstructionForm.patchValue({
    pmid: this.camsworkinstructionservice.formData.pmid,
    pmiddesc: this.camsworkinstructionservice.formData.pmiddesc,
});
}
{
let arrpmid = this.pmidList.filter(v => v.pmid == this.camsworkinstructionForm.get('pmid').value);
let objpmid;
if (arrpmid.length > 0) objpmid = arrpmid[0];
if (objpmid)
{
}
}
}
).catch((err) => {console.log(err);});
this.pmid_camspmmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.pmidList.filter(v => v.reference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.pmid_camspmmastersformatter = (result: any) => result.reference;

//autocomplete
    this.camsworkinstructionservice.getcamsworkinstructionsList().then(res => {
      this.pkList = res as camsworkinstruction[];
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
this.camsworkinstructionForm.markAsUntouched();
this.camsworkinstructionForm.markAsPristine();
}
onSelectedworkorderdetailid(workorderdetailidDetail: any) {
if (workorderdetailidDetail.workorderdetailid && workorderdetailidDetail) {
this.camsworkinstructionForm.patchValue({
workorderdetailid: workorderdetailidDetail.workorderdetailid,
workorderdetailiddesc: workorderdetailidDetail.taskdescription,

});

}
}

onSelectedworkorderid(workorderidDetail: any) {
if (workorderidDetail.workorderid && workorderidDetail) {
this.camsworkinstructionForm.patchValue({
workorderid: workorderidDetail.workorderid,
workorderiddesc: workorderidDetail.requestreference,

});

}
}

onSelectedpmid(pmidDetail: any) {
if (pmidDetail.pmid && pmidDetail) {
this.camsworkinstructionForm.patchValue({
pmid: pmidDetail.pmid,
pmiddesc: pmidDetail.reference,

});

}
}




resetForm() {
if (this.camsworkinstructionForm != null)
this.camsworkinstructionForm.reset();
this.camsworkinstructionForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let workinstructionid = this.camsworkinstructionForm.get('workinstructionid').value;
        if(workinstructionid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsworkinstructionservice.deletecamsworkinstruction(workinstructionid).then(res =>
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
    this.camsworkinstructionForm.patchValue({
        workinstructionid: null
    });
    if(this.camsworkinstructionservice.formData.workinstructionid!=null)this.camsworkinstructionservice.formData.workinstructionid=null;
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
this.camsworkinstructionForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsworkinstructionForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsworkinstructionForm.controls[key]!=undefined)
{
this.camsworkinstructionForm.controls[key].disable({onlySelf: true});
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
workinstructionidonChange(evt:any){
let e=evt.value;
}
workorderdetailidonChange(evt:any){
let e=evt.value;
}
workorderidonChange(evt:any){
let e=evt.value;
}
scheduleidonChange(evt:any){
let e=evt.value;
}
scheduletaskidonChange(evt:any){
let e=evt.value;
}
pmidonChange(evt:any){
let e=evt.value;
}
pmtaskidonChange(evt:any){
let e=evt.value;
}
pminstructionidonChange(evt:any){
let e=evt.value;
}
sequenceonChange(evt:any){
let e=evt.value;
}
codeonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
verifiedonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editcamsworkinstructions() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsworkinstructionservice.getcamsworkinstructionsByEID(pkcol).then(res => {

this.camsworkinstructionservice.formData=res.camsworkinstruction;
let formproperty=res.camsworkinstruction.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsworkinstruction.pkcol;
this.formid=res.camsworkinstruction.workinstructionid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsworkinstruction.workinstructionid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsworkinstructionForm.patchValue({
workinstructionid: res.camsworkinstruction.workinstructionid,
workorderdetailid: res.camsworkinstruction.workorderdetailid,
workorderdetailiddesc: res.camsworkinstruction.workorderdetailiddesc,
workorderid: res.camsworkinstruction.workorderid,
workorderiddesc: res.camsworkinstruction.workorderiddesc,
scheduleid: res.camsworkinstruction.scheduleid,
scheduletaskid: res.camsworkinstruction.scheduletaskid,
pmid: res.camsworkinstruction.pmid,
pmiddesc: res.camsworkinstruction.pmiddesc,
pmtaskid: res.camsworkinstruction.pmtaskid,
pminstructionid: res.camsworkinstruction.pminstructionid,
sequence: res.camsworkinstruction.sequence,
code: res.camsworkinstruction.code,
details: res.camsworkinstruction.details,
verified: res.camsworkinstruction.verified,
remarks: res.camsworkinstruction.remarks,
status: res.camsworkinstruction.status,
statusdesc: res.camsworkinstruction.statusdesc,
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
  for (let key in this.camsworkinstructionForm.controls) {
    if (this.camsworkinstructionForm.controls[key] != null) {
if(false)
{
if(this.camsworkinstructionservice.formData!=null && this.camsworkinstructionservice.formData[key]!=null  && this.camsworkinstructionservice.formData[key]!='[]' && this.camsworkinstructionservice.formData[key]!=undefined && this.camsworkinstructionservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsworkinstructionservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsworkinstructionservice.formData!=null && this.camsworkinstructionservice.formData[key]!=null   && this.camsworkinstructionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsworkinstructionservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsworkinstructionservice.formData!=null && this.camsworkinstructionservice.formData[key]!=null   && this.camsworkinstructionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsworkinstructionservice.formData[key]+"'><div class='progress__number'>"+this.camsworkinstructionservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsworkinstructionForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsworkinstructionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.camsworkinstructionForm.value;
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

private camsworkinstructiontoggleOption(){
this.camsworkinstructionshowOption = this.camsworkinstructionshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsworkinstructionForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsworkinstructionForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsworkinstructionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsworkinstructionservice.formData=this.camsworkinstructionForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsworkinstructionForm.controls[key] != null)
    {
        this.camsworkinstructionservice.formData[key] = this.camsworkinstructionForm.controls[key].value;
    }
}
}
}
console.log(this.camsworkinstructionservice.formData);
this.camsworkinstructionservice.formData=this.camsworkinstructionForm.value;
this.camsworkinstructionservice.saveOrUpdatecamsworkinstructions().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworkinstruction);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsworkinstructionservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworkinstruction);
}
else
{
this.FillData(res);
}
}
this.camsworkinstructionForm.markAsUntouched();
this.camsworkinstructionForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditworkorderdetailid( workorderdetailid) {
/*let ScreenType='2';
this.dialog.open(camsworkdetailComponent, 
{
data: {workorderdetailid:this.camsworkinstructionForm.get('workorderdetailid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditworkorderid( workorderid) {
/*let ScreenType='2';
this.dialog.open(camsworkorderComponent, 
{
data: {workorderid:this.camsworkinstructionForm.get('workorderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpmid( pmid) {
/*let ScreenType='2';
this.dialog.open(camspmmasterComponent, 
{
data: {pmid:this.camsworkinstructionForm.get('pmid').value, ScreenType:2 }
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



