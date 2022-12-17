import { camsassetdisposalService } from './../../../service/camsassetdisposal.service';
import { camsassetdisposal } from './../../../model/camsassetdisposal.model';
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
import { camsassetdisposalplan} from './../../../model/camsassetdisposalplan.model';
import { camsassetdisposalplanComponent } from './../../../pages/forms/camsassetdisposalplan/camsassetdisposalplan.component';
import { camsassetdisposalplanService } from './../../../service/camsassetdisposalplan.service';
//popups
import { camsassetmaster} from './../../../model/camsassetmaster.model';
import { camsassetmasterComponent } from './../../../pages/forms/camsassetmaster/camsassetmaster.component';
import { camsassetmasterService } from './../../../service/camsassetmaster.service';
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
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-camsassetdisposal',
templateUrl: './camsassetdisposal.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsassetdisposalComponent implements OnInit {
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
@ViewChild('customform',{static:false}) customform: DynamicFormBuilderComponent;
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
bfilterPopulatecamsassetdisposals:boolean=false;
datacamsassetdisposalsdisposalplanid3:any=[];
datacamsassetdisposalsassetid3:any=[];
datacamsassetdisposalsdisposalmethod3:any=[];
datacamsassetdisposalsdisposedby3:any=[];
datacamsassetdisposalsdisposedreason3:any=[];
 camsassetdisposalForm: FormGroup;
disposalplanidList: camsassetdisposalplan[];
disposalplanidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
disposalplanid_camsassetdisposalplansForm: FormGroup;//autocomplete
disposalplanid_camsassetdisposalplansoptions:any;//autocomplete
disposalplanid_camsassetdisposalplansformatter:any;//autocomplete
assetidList: camsassetmaster[];
assetidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assetid_camsassetmastersForm: FormGroup;//autocomplete
assetid_camsassetmastersoptions:any;//autocomplete
assetid_camsassetmastersformatter:any;//autocomplete
disposalmethodList: boconfigvalue[];
disposedbyList: bousermaster[];
disposedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
disposedby_bousermastersForm: FormGroup;//autocomplete
disposedby_bousermastersoptions:any;//autocomplete
disposedby_bousermastersformatter:any;//autocomplete
disposedreasonList: boconfigvalue[];
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
camsassetdisposalshowOption:boolean;
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
private camsassetdisposalservice: camsassetdisposalService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camsassetdisposalplanservice:camsassetdisposalplanService,
private camsassetmasterservice:camsassetmasterService,
private bousermasterservice:bousermasterService,
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
this.camsassetdisposalForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
disposalid: [null],
disposalplanid: [null],
disposalplaniddesc: [null],
assetid: [null, Validators.required],
assetiddesc: [null],
assetgroup: [null],
assetdescription: [null],
assetreference: [null],
cost: [null],
disposalmethod: [null, Validators.required],
disposalmethoddesc: [null],
disposedby: [null, Validators.required],
disposedbydesc: [null],
disposaldate: [null, Validators.required],
accountdate: [null],
disposalamount: [null, Validators.required],
disposedreason: [null, Validators.required],
disposedreasondesc: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsassetdisposalForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsassetdisposalForm.dirty && this.camsassetdisposalForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.disposalid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.disposalid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.disposalid && pkDetail) {
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
let camsassetdisposalid = null;

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
this.formid=camsassetdisposalid;
//this.sharedService.alert(camsassetdisposalid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camsassetdisposalplanservice.getcamsassetdisposalplansList().then(res => 
{
this.disposalplanidList = res as camsassetdisposalplan[];
if(this.camsassetdisposalservice.formData && this.camsassetdisposalservice.formData.disposalplanid){
this.disposalplanidoptionsEvent.emit(this.disposalplanidList);
this.camsassetdisposalForm.patchValue({
    disposalplanid: this.camsassetdisposalservice.formData.disposalplanid,
    disposalplaniddesc: this.camsassetdisposalservice.formData.disposalplaniddesc,
});
}
{
let arrdisposalplanid = this.disposalplanidList.filter(v => v.disposalplanid == this.camsassetdisposalForm.get('disposalplanid').value);
let objdisposalplanid;
if (arrdisposalplanid.length > 0) objdisposalplanid = arrdisposalplanid[0];
if (objdisposalplanid)
{
}
}
}
).catch((err) => {console.log(err);});
this.disposalplanid_camsassetdisposalplansoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.disposalplanidList.filter(v => v.details.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.disposalplanid_camsassetdisposalplansformatter = (result: any) => result.details;
this.camsassetmasterservice.getcamsassetmastersList().then(res => 
{
this.assetidList = res as camsassetmaster[];
if(this.camsassetdisposalservice.formData && this.camsassetdisposalservice.formData.assetid){
this.assetidoptionsEvent.emit(this.assetidList);
this.camsassetdisposalForm.patchValue({
    assetid: this.camsassetdisposalservice.formData.assetid,
    assetiddesc: this.camsassetdisposalservice.formData.assetiddesc,
});
}
{
let arrassetid = this.assetidList.filter(v => v.assetid == this.camsassetdisposalForm.get('assetid').value);
let objassetid;
if (arrassetid.length > 0) objassetid = arrassetid[0];
if (objassetid)
{
}
}
}
).catch((err) => {console.log(err);});
this.assetid_camsassetmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assetidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assetid_camsassetmastersformatter = (result: any) => result.description;
this.configservice.getList("disposalmethod").then(res => this.disposalmethodList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.disposedbyList = res as bousermaster[];
if(this.camsassetdisposalservice.formData && this.camsassetdisposalservice.formData.disposedby){
this.disposedbyoptionsEvent.emit(this.disposedbyList);
this.camsassetdisposalForm.patchValue({
    disposedby: this.camsassetdisposalservice.formData.disposedby,
    disposedbydesc: this.camsassetdisposalservice.formData.disposedbydesc,
});
}
{
let arrdisposedby = this.disposedbyList.filter(v => v.userid == this.camsassetdisposalForm.get('disposedby').value);
let objdisposedby;
if (arrdisposedby.length > 0) objdisposedby = arrdisposedby[0];
if (objdisposedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.disposedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.disposedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.disposedby_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("disposedreason").then(res => this.disposedreasonList = res as boconfigvalue[]);

//autocomplete
    this.camsassetdisposalservice.getcamsassetdisposalsList().then(res => {
      this.pkList = res as camsassetdisposal[];
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
this.camsassetdisposalForm.markAsUntouched();
this.camsassetdisposalForm.markAsPristine();
}
onSelecteddisposalplanid(disposalplanidDetail: any) {
if (disposalplanidDetail.disposalplanid && disposalplanidDetail) {
this.camsassetdisposalForm.patchValue({
disposalplanid: disposalplanidDetail.disposalplanid,
disposalplaniddesc: disposalplanidDetail.details,

});

}
}

onSelectedassetid(assetidDetail: any) {
if (assetidDetail.assetid && assetidDetail) {
this.camsassetdisposalForm.patchValue({
assetid: assetidDetail.assetid,
assetiddesc: assetidDetail.description,

});

}
}

onSelecteddisposedby(disposedbyDetail: any) {
if (disposedbyDetail.userid && disposedbyDetail) {
this.camsassetdisposalForm.patchValue({
disposedby: disposedbyDetail.userid,
disposedbydesc: disposedbyDetail.username,

});

}
}




resetForm() {
if (this.camsassetdisposalForm != null)
this.camsassetdisposalForm.reset();
this.camsassetdisposalForm.patchValue({
disposedby: this.sessiondata.userid,
disposedbydesc: this.sessiondata.username,
});
this.camsassetdisposalForm.patchValue({
disposaldate: this.ngbDateParserFormatter.parse(new Date().toString()),
accountdate: this.ngbDateParserFormatter.parse(new Date().toString()),
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let disposalid = this.camsassetdisposalForm.get('disposalid').value;
        if(disposalid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsassetdisposalservice.deletecamsassetdisposal(disposalid).then(res =>
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
    this.camsassetdisposalForm.patchValue({
        disposalid: null
    });
    if(this.camsassetdisposalservice.formData.disposalid!=null)this.camsassetdisposalservice.formData.disposalid=null;
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
        else if(key=="disposaldate")
this.camsassetdisposalForm.patchValue({"disposaldate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="accountdate")
this.camsassetdisposalForm.patchValue({"accountdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="remarks")
this.camsassetdisposalForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.camsassetdisposalForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsassetdisposalForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsassetdisposalForm.controls[key]!=undefined)
{
this.camsassetdisposalForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("camsassetdisposals",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


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
branchidonChange(evt:any){
let e=evt.value;
}
disposalidonChange(evt:any){
let e=evt.value;
}
disposalplanidonChange(evt:any){
let e=evt.value;
}
assetidonChange(evt:any){
let e=evt.value;
}
assetgrouponChange(evt:any){
let e=evt.value;
}
assetdescriptiononChange(evt:any){
let e=evt.value;
}
assetreferenceonChange(evt:any){
let e=evt.value;
}
costonChange(evt:any){
let e=evt.value;
}
disposalmethodonChange(evt:any){
let e=this.f.disposalmethod.value as any;
this.camsassetdisposalForm.patchValue({disposalmethoddesc:evt.options[evt.options.selectedIndex].text});
}
disposedbyonChange(evt:any){
let e=evt.value;
}
disposaldateonChange(evt:any){
let e=evt.value;
}
accountdateonChange(evt:any){
let e=evt.value;
}
disposalamountonChange(evt:any){
let e=evt.value;
}
disposedreasononChange(evt:any){
let e=this.f.disposedreason.value as any;
this.camsassetdisposalForm.patchValue({disposedreasondesc:evt.options[evt.options.selectedIndex].text});
}
remarksonChange(evt:any){
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
  


editcamsassetdisposals() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsassetdisposalservice.getcamsassetdisposalsByEID(pkcol).then(res => {

this.camsassetdisposalservice.formData=res.camsassetdisposal;
let formproperty=res.camsassetdisposal.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsassetdisposal.pkcol;
this.formid=res.camsassetdisposal.disposalid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsassetdisposal.disposalid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsassetdisposalForm.patchValue({
branchid: res.camsassetdisposal.branchid,
disposalid: res.camsassetdisposal.disposalid,
disposalplanid: res.camsassetdisposal.disposalplanid,
disposalplaniddesc: res.camsassetdisposal.disposalplaniddesc,
assetid: res.camsassetdisposal.assetid,
assetiddesc: res.camsassetdisposal.assetiddesc,
assetgroup: res.camsassetdisposal.assetgroup,
assetdescription: res.camsassetdisposal.assetdescription,
assetreference: res.camsassetdisposal.assetreference,
cost: res.camsassetdisposal.cost,
disposalmethod: res.camsassetdisposal.disposalmethod,
disposalmethoddesc: res.camsassetdisposal.disposalmethoddesc,
disposedby: res.camsassetdisposal.disposedby,
disposedbydesc: res.camsassetdisposal.disposedbydesc,
disposaldate: this.ngbDateParserFormatter.parse(res.camsassetdisposal.disposaldate),
accountdate: this.ngbDateParserFormatter.parse(res.camsassetdisposal.accountdate),
disposalamount: res.camsassetdisposal.disposalamount,
disposedreason: res.camsassetdisposal.disposedreason,
disposedreasondesc: res.camsassetdisposal.disposedreasondesc,
remarks: JSON.parse(res.camsassetdisposal.remarks),
customfield: res.camsassetdisposal.customfield,
attachment: JSON.parse(res.camsassetdisposal.attachment),
status: res.camsassetdisposal.status,
statusdesc: res.camsassetdisposal.statusdesc,
});
if(this.camsassetdisposalForm.get('customfield').value!=null && this.camsassetdisposalForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.camsassetdisposalForm.get('customfield').value);
this.FillCustomField();
if(this.camsassetdisposalForm.get('attachment').value!=null && this.camsassetdisposalForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.camsassetdisposalForm.get('attachment').value);
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
  for (let key in this.camsassetdisposalForm.controls) {
    if (this.camsassetdisposalForm.controls[key] != null) {
if(false)
{
if(this.camsassetdisposalservice.formData!=null && this.camsassetdisposalservice.formData[key]!=null  && this.camsassetdisposalservice.formData[key]!='[]' && this.camsassetdisposalservice.formData[key]!=undefined && this.camsassetdisposalservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsassetdisposalservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsassetdisposalservice.formData!=null && this.camsassetdisposalservice.formData[key]!=null   && this.camsassetdisposalservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsassetdisposalservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsassetdisposalservice.formData!=null && this.camsassetdisposalservice.formData[key]!=null   && this.camsassetdisposalservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsassetdisposalservice.formData[key]+"'><div class='progress__number'>"+this.camsassetdisposalservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsassetdisposalForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsassetdisposalForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.camsassetdisposalForm.value;
obj.disposaldate=new Date(this.camsassetdisposalForm.get('disposaldate').value ? this.ngbDateParserFormatter.format(this.camsassetdisposalForm.get('disposaldate').value)+'  UTC' :null);
obj.accountdate=new Date(this.camsassetdisposalForm.get('accountdate').value ? this.ngbDateParserFormatter.format(this.camsassetdisposalForm.get('accountdate').value)+'  UTC' :null);
if(this.camsassetdisposalForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.camsassetdisposalForm.get('remarks').value);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
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

private camsassetdisposaltoggleOption(){
this.camsassetdisposalshowOption = this.camsassetdisposalshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsassetdisposalForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsassetdisposalForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsassetdisposalForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsassetdisposalservice.formData=this.camsassetdisposalForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsassetdisposalForm.controls[key] != null)
    {
        this.camsassetdisposalservice.formData[key] = this.camsassetdisposalForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.camsassetdisposalservice.formData.disposaldate=new Date(this.camsassetdisposalForm.get('disposaldate').value ? this.ngbDateParserFormatter.format(this.camsassetdisposalForm.get('disposaldate').value)+'  UTC' :null);
this.camsassetdisposalservice.formData.accountdate=new Date(this.camsassetdisposalForm.get('accountdate').value ? this.ngbDateParserFormatter.format(this.camsassetdisposalForm.get('accountdate').value)+'  UTC' :null);
if(this.camsassetdisposalForm.get('remarks').value!=null)this.camsassetdisposalservice.formData.remarks=JSON.stringify(this.camsassetdisposalForm.get('remarks').value);
if(customfields!=null)this.camsassetdisposalservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.camsassetdisposalservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.camsassetdisposalservice.formData);
this.camsassetdisposalservice.formData=this.camsassetdisposalForm.value;
this.camsassetdisposalservice.saveOrUpdatecamsassetdisposals().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsassetdisposal);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsassetdisposalservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsassetdisposal);
}
else
{
this.FillData(res);
}
}
this.camsassetdisposalForm.markAsUntouched();
this.camsassetdisposalForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditdisposalplanid( disposalplanid) {
/*let ScreenType='2';
this.dialog.open(camsassetdisposalplanComponent, 
{
data: {disposalplanid:this.camsassetdisposalForm.get('disposalplanid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassetid( assetid) {
/*let ScreenType='2';
this.dialog.open(camsassetmasterComponent, 
{
data: {assetid:this.camsassetdisposalForm.get('assetid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdisposedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.camsassetdisposalForm.get('disposedby').value, ScreenType:2 }
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



