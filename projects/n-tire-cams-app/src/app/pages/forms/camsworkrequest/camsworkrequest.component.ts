import { camsworkrequestService } from './../../../service/camsworkrequest.service';
import { camsworkrequest } from './../../../model/camsworkrequest.model';
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
import { camsassetmaster} from './../../../model/camsassetmaster.model';
import { camsassetmasterComponent } from './../../../pages/forms/camsassetmaster/camsassetmaster.component';
import { camsassetmasterService } from './../../../service/camsassetmaster.service';
//popups
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { bobranchsublocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchsublocation.model';
import { bobranchsublocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchsublocation/bobranchsublocation.component';
import { bobranchsublocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchsublocation.service';
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
selector: 'app-camsworkrequest',
templateUrl: './camsworkrequest.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsworkrequestComponent implements OnInit {
showworkflow: boolean = false;
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
bfilterPopulatecamsworkrequests:boolean=false;
datacamsworkrequestsrequesttype3:any=[];
datacamsworkrequestsworktype3:any=[];
datacamsworkrequestsrequestorid3:any=[];
datacamsworkrequestsassetid3:any=[];
datacamsworkrequestslocationid3:any=[];
datacamsworkrequestssublocationid3:any=[];
datacamsworkrequestspriority3:any=[];
datacamsworkrequestscriticality3:any=[];
datacamsworkrequestsrequeststatus3:any=[];
 camsworkrequestForm: FormGroup;
requesttypeList: boconfigvalue[];
worktypeList: boconfigvalue[];
requestoridList: bousermaster[];
requestoridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
requestorid_bousermastersForm: FormGroup;//autocomplete
requestorid_bousermastersoptions:any;//autocomplete
requestorid_bousermastersformatter:any;//autocomplete
assetidList: camsassetmaster[];
assetidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assetid_camsassetmastersForm: FormGroup;//autocomplete
assetid_camsassetmastersoptions:any;//autocomplete
assetid_camsassetmastersformatter:any;//autocomplete
locationidList: bobranchlocation[];
locationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
locationid_bobranchlocationsForm: FormGroup;//autocomplete
locationid_bobranchlocationsoptions:any;//autocomplete
locationid_bobranchlocationsformatter:any;//autocomplete
sublocationidList: bobranchsublocation[];
sublocationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
sublocationid_bobranchsublocationsForm: FormGroup;//autocomplete
sublocationid_bobranchsublocationsoptions:any;//autocomplete
sublocationid_bobranchsublocationsformatter:any;//autocomplete
priorityList: boconfigvalue[];
criticalityList: boconfigvalue[];
requeststatusList: boconfigvalue[];
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
camsworkrequestshowOption:boolean;
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
private camsworkrequestservice: camsworkrequestService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
private camsassetmasterservice:camsassetmasterService,
private bobranchlocationservice:bobranchlocationService,
private bobranchsublocationservice:bobranchsublocationService,
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
this.camsworkrequestForm  = this.fb.group({
pk:[null],
ImageName: [null],
requestid: [null],
requestreference: [null],
requestdate: [null, Validators.required],
requesttype: [null],
requesttypedesc: [null],
worktype: [null],
worktypedesc: [null],
requestorid: [null, Validators.required],
requestoriddesc: [null],
assetid: [null, Validators.required],
assetiddesc: [null],
locationid: [null],
locationiddesc: [null],
sublocationid: [null],
sublocationiddesc: [null],
details: [null, Validators.required],
priority: [null, Validators.required],
prioritydesc: [null],
criticality: [null],
criticalitydesc: [null],
requireddate: [null, Validators.required],
datecreated: [null, Validators.required],
datecompleted: [null],
actualtat: [null],
remarks: [null],
requeststatus: [null],
requeststatusdesc: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsworkrequestForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsworkrequestForm.dirty && this.camsworkrequestForm.touched ) {
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
let camsworkrequestid = null;

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
this.formid=camsworkrequestid;
//this.sharedService.alert(camsworkrequestid);

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
this.configservice.getList("requesttype").then(res => this.requesttypeList = res as boconfigvalue[]);
this.configservice.getList("pmworktype").then(res => this.worktypeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.requestoridList = res as bousermaster[];
if(this.camsworkrequestservice.formData && this.camsworkrequestservice.formData.requestorid){
this.requestoridoptionsEvent.emit(this.requestoridList);
this.camsworkrequestForm.patchValue({
    requestorid: this.camsworkrequestservice.formData.requestorid,
    requestoriddesc: this.camsworkrequestservice.formData.requestoriddesc,
});
}
{
let arrrequestorid = this.requestoridList.filter(v => v.userid == this.camsworkrequestForm.get('requestorid').value);
let objrequestorid;
if (arrrequestorid.length > 0) objrequestorid = arrrequestorid[0];
if (objrequestorid)
{
}
}
}
).catch((err) => {console.log(err);});
this.requestorid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.requestoridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.requestorid_bousermastersformatter = (result: any) => result.username;
this.camsassetmasterservice.getcamsassetmastersList().then(res => 
{
this.assetidList = res as camsassetmaster[];
if(this.camsworkrequestservice.formData && this.camsworkrequestservice.formData.assetid){
this.assetidoptionsEvent.emit(this.assetidList);
this.camsworkrequestForm.patchValue({
    assetid: this.camsworkrequestservice.formData.assetid,
    assetiddesc: this.camsworkrequestservice.formData.assetiddesc,
});
}
{
let arrassetid = this.assetidList.filter(v => v.assetid == this.camsworkrequestForm.get('assetid').value);
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
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.locationidList = res as bobranchlocation[];
if(this.camsworkrequestservice.formData && this.camsworkrequestservice.formData.locationid){
this.locationidoptionsEvent.emit(this.locationidList);
this.camsworkrequestForm.patchValue({
    locationid: this.camsworkrequestservice.formData.locationid,
    locationiddesc: this.camsworkrequestservice.formData.locationiddesc,
});
}
{
let arrlocationid = this.locationidList.filter(v => v.locationid == this.camsworkrequestForm.get('locationid').value);
let objlocationid;
if (arrlocationid.length > 0) objlocationid = arrlocationid[0];
if (objlocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.locationid_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.locationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.locationid_bobranchlocationsformatter = (result: any) => result.locationname;
this.bobranchsublocationservice.getbobranchsublocationsList().then(res => 
{
this.sublocationidList = res as bobranchsublocation[];
if(this.camsworkrequestservice.formData && this.camsworkrequestservice.formData.sublocationid){
this.sublocationidoptionsEvent.emit(this.sublocationidList);
this.camsworkrequestForm.patchValue({
    sublocationid: this.camsworkrequestservice.formData.sublocationid,
    sublocationiddesc: this.camsworkrequestservice.formData.sublocationiddesc,
});
}
{
let arrsublocationid = this.sublocationidList.filter(v => v.sublocationid == this.camsworkrequestForm.get('sublocationid').value);
let objsublocationid;
if (arrsublocationid.length > 0) objsublocationid = arrsublocationid[0];
if (objsublocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.sublocationid_bobranchsublocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.sublocationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.sublocationid_bobranchsublocationsformatter = (result: any) => result.locationname;
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("criticality").then(res => this.criticalityList = res as boconfigvalue[]);
this.configservice.getList("requeststatus").then(res => this.requeststatusList = res as boconfigvalue[]);

//autocomplete
    this.camsworkrequestservice.getcamsworkrequestsList().then(res => {
      this.pkList = res as camsworkrequest[];
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
this.camsworkrequestForm.markAsUntouched();
this.camsworkrequestForm.markAsPristine();
}
onSelectedrequestorid(requestoridDetail: any) {
if (requestoridDetail.userid && requestoridDetail) {
this.camsworkrequestForm.patchValue({
requestorid: requestoridDetail.userid,
requestoriddesc: requestoridDetail.username,

});

}
}

onSelectedassetid(assetidDetail: any) {
if (assetidDetail.assetid && assetidDetail) {
this.camsworkrequestForm.patchValue({
assetid: assetidDetail.assetid,
assetiddesc: assetidDetail.description,

});

}
}

onSelectedlocationid(locationidDetail: any) {
if (locationidDetail.locationid && locationidDetail) {
this.camsworkrequestForm.patchValue({
locationid: locationidDetail.locationid,
locationiddesc: locationidDetail.locationname,

});

}
}

onSelectedsublocationid(sublocationidDetail: any) {
if (sublocationidDetail.sublocationid && sublocationidDetail) {
this.camsworkrequestForm.patchValue({
sublocationid: sublocationidDetail.sublocationid,
sublocationiddesc: sublocationidDetail.locationname,

});

}
}




resetForm() {
if (this.camsworkrequestForm != null)
this.camsworkrequestForm.reset();
this.camsworkrequestForm.patchValue({
requestorid: this.sessiondata.userid,
requestoriddesc: this.sessiondata.username,
});
this.camsworkrequestForm.patchValue({
requestdate: this.ngbDateParserFormatter.parse(new Date().toString()),
requireddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
datecreated: this.ngbDateParserFormatter.parse(new Date().toISOString()),
datecompleted: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let requestid = this.camsworkrequestForm.get('requestid').value;
        if(requestid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsworkrequestservice.deletecamsworkrequest(requestid).then(res =>
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
    this.camsworkrequestForm.patchValue({
        requestid: null
    });
    if(this.camsworkrequestservice.formData.requestid!=null)this.camsworkrequestservice.formData.requestid=null;
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
        else if(key=="requestdate")
this.camsworkrequestForm.patchValue({"requestdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="requireddate")
this.camsworkrequestForm.patchValue({"requireddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="datecreated")
this.camsworkrequestForm.patchValue({"datecreated":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="datecompleted")
this.camsworkrequestForm.patchValue({"datecompleted":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualtat")
this.camsworkrequestForm.patchValue({"actualtat":new Time(mainscreendata[key]) });
        else if(key=="remarks")
this.camsworkrequestForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.camsworkrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsworkrequestForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsworkrequestForm.controls[key]!=undefined)
{
this.camsworkrequestForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("camsworkrequests",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
requestidonChange(evt:any){
let e=evt.value;
}
requestreferenceonChange(evt:any){
let e=evt.value;
}
requestdateonChange(evt:any){
let e=evt.value;
}
requesttypeonChange(evt:any){
let e=this.f.requesttype.value as any;
this.camsworkrequestForm.patchValue({requesttypedesc:evt.options[evt.options.selectedIndex].text});
}
worktypeonChange(evt:any){
let e=this.f.worktype.value as any;
this.camsworkrequestForm.patchValue({worktypedesc:evt.options[evt.options.selectedIndex].text});
}
requestoridonChange(evt:any){
let e=evt.value;
}
assetidonChange(evt:any){
let e=evt.value;
}
locationidonChange(evt:any){
let e=evt.value;
}
sublocationidonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.camsworkrequestForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
criticalityonChange(evt:any){
let e=this.f.criticality.value as any;
this.camsworkrequestForm.patchValue({criticalitydesc:evt.options[evt.options.selectedIndex].text});
}
requireddateonChange(evt:any){
let e=evt.value;
}
datecreatedonChange(evt:any){
let e=evt.value;
}
datecompletedonChange(evt:any){
let e=evt.value;
}
actualtatonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
requeststatusonChange(evt:any){
let e=this.f.requeststatus.value as any;
this.camsworkrequestForm.patchValue({requeststatusdesc:evt.options[evt.options.selectedIndex].text});
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
  


editcamsworkrequests() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsworkrequestservice.getcamsworkrequestsByEID(pkcol).then(res => {

this.camsworkrequestservice.formData=res.camsworkrequest;
let formproperty=res.camsworkrequest.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsworkrequest.pkcol;
this.formid=res.camsworkrequest.requestid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsworkrequest.requestid;
var actualtatTime=new Time( res.camsworkrequest.actualtat);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsworkrequestForm.patchValue({
requestid: res.camsworkrequest.requestid,
requestreference: res.camsworkrequest.requestreference,
requestdate: this.ngbDateParserFormatter.parse(res.camsworkrequest.requestdate),
requesttype: res.camsworkrequest.requesttype,
requesttypedesc: res.camsworkrequest.requesttypedesc,
worktype: res.camsworkrequest.worktype,
worktypedesc: res.camsworkrequest.worktypedesc,
requestorid: res.camsworkrequest.requestorid,
requestoriddesc: res.camsworkrequest.requestoriddesc,
assetid: res.camsworkrequest.assetid,
assetiddesc: res.camsworkrequest.assetiddesc,
locationid: res.camsworkrequest.locationid,
locationiddesc: res.camsworkrequest.locationiddesc,
sublocationid: res.camsworkrequest.sublocationid,
sublocationiddesc: res.camsworkrequest.sublocationiddesc,
details: res.camsworkrequest.details,
priority: res.camsworkrequest.priority,
prioritydesc: res.camsworkrequest.prioritydesc,
criticality: res.camsworkrequest.criticality,
criticalitydesc: res.camsworkrequest.criticalitydesc,
requireddate: this.ngbDateParserFormatter.parse(res.camsworkrequest.requireddate),
datecreated: this.ngbDateParserFormatter.parse(res.camsworkrequest.datecreated),
datecompleted: this.ngbDateParserFormatter.parse(res.camsworkrequest.datecompleted),
actualtat: actualtatTime,
remarks: JSON.parse(res.camsworkrequest.remarks),
requeststatus: res.camsworkrequest.requeststatus,
requeststatusdesc: res.camsworkrequest.requeststatusdesc,
customfield: res.camsworkrequest.customfield,
attachment: JSON.parse(res.camsworkrequest.attachment),
status: res.camsworkrequest.status,
statusdesc: res.camsworkrequest.statusdesc,
});
                    this.showworkflow=true;
                this.showsubmit = false;
if(res.camsworkrequest.status=="N" || res.camsworkrequest.status=="P")this.showsubmit=true;
if(res.camsworkrequest.status=="N")this.showGoWorkFlow = true;
if(this.camsworkrequestForm.get('customfield').value!=null && this.camsworkrequestForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.camsworkrequestForm.get('customfield').value);
this.FillCustomField();
if(this.camsworkrequestForm.get('attachment').value!=null && this.camsworkrequestForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.camsworkrequestForm.get('attachment').value);
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
  for (let key in this.camsworkrequestForm.controls) {
    if (this.camsworkrequestForm.controls[key] != null) {
if(false)
{
if(this.camsworkrequestservice.formData!=null && this.camsworkrequestservice.formData[key]!=null  && this.camsworkrequestservice.formData[key]!='[]' && this.camsworkrequestservice.formData[key]!=undefined && this.camsworkrequestservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsworkrequestservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsworkrequestservice.formData!=null && this.camsworkrequestservice.formData[key]!=null   && this.camsworkrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsworkrequestservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsworkrequestservice.formData!=null && this.camsworkrequestservice.formData[key]!=null   && this.camsworkrequestservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsworkrequestservice.formData[key]+"'><div class='progress__number'>"+this.camsworkrequestservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsworkrequestForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsworkrequestForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.camsworkrequestForm.value;
obj.requestdate=new Date(this.camsworkrequestForm.get('requestdate').value ? this.ngbDateParserFormatter.format(this.camsworkrequestForm.get('requestdate').value)+'  UTC' :null);
obj.requireddate=new Date(this.camsworkrequestForm.get('requireddate').value ? this.ngbDateParserFormatter.format(this.camsworkrequestForm.get('requireddate').value)+'  UTC' :null);
obj.datecreated=new Date(this.camsworkrequestForm.get('datecreated').value ? this.ngbDateParserFormatter.format(this.camsworkrequestForm.get('datecreated').value)+'  UTC' :null);
obj.datecompleted=new Date(this.camsworkrequestForm.get('datecompleted').value ? this.ngbDateParserFormatter.format(this.camsworkrequestForm.get('datecompleted').value)+'  UTC' :null);
obj.actualtat=(this.camsworkrequestForm.get('actualtat').value==null?0:this.camsworkrequestForm.get('actualtat').value.hour)+':'+(this.camsworkrequestForm.get('actualtat').value==null?0:this.camsworkrequestForm.get('actualtat').value.minute+":00");
if(this.camsworkrequestForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.camsworkrequestForm.get('remarks').value);
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

private camsworkrequesttoggleOption(){
this.camsworkrequestshowOption = this.camsworkrequestshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsworkrequestForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsworkrequestForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsworkrequestForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsworkrequestservice.formData=this.camsworkrequestForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsworkrequestForm.controls[key] != null)
    {
        this.camsworkrequestservice.formData[key] = this.camsworkrequestForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.camsworkrequestservice.formData.requestdate=new Date(this.camsworkrequestForm.get('requestdate').value ? this.ngbDateParserFormatter.format(this.camsworkrequestForm.get('requestdate').value)+'  UTC' :null);
this.camsworkrequestservice.formData.requireddate=new Date(this.camsworkrequestForm.get('requireddate').value ? this.ngbDateParserFormatter.format(this.camsworkrequestForm.get('requireddate').value)+'  UTC' :null);
this.camsworkrequestservice.formData.datecreated=new Date(this.camsworkrequestForm.get('datecreated').value ? this.ngbDateParserFormatter.format(this.camsworkrequestForm.get('datecreated').value)+'  UTC' :null);
this.camsworkrequestservice.formData.datecompleted=new Date(this.camsworkrequestForm.get('datecompleted').value ? this.ngbDateParserFormatter.format(this.camsworkrequestForm.get('datecompleted').value)+'  UTC' :null);
this.camsworkrequestservice.formData.actualtat=(this.camsworkrequestForm.get('actualtat').value==null?0:this.camsworkrequestForm.get('actualtat').value.hour)+':'+(this.camsworkrequestForm.get('actualtat').value==null?0:this.camsworkrequestForm.get('actualtat').value.minute+":00");
if(this.camsworkrequestForm.get('remarks').value!=null)this.camsworkrequestservice.formData.remarks=JSON.stringify(this.camsworkrequestForm.get('remarks').value);
if(customfields!=null)this.camsworkrequestservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.camsworkrequestservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.camsworkrequestservice.formData);
this.camsworkrequestservice.formData=this.camsworkrequestForm.value;
this.camsworkrequestservice.saveOrUpdatecamsworkrequests().subscribe(
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
this.dialogRef.close((res as any).camsworkrequest);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsworkrequestservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsworkrequest);
}
else
{
this.FillData(res);
}
}
this.camsworkrequestForm.markAsUntouched();
this.camsworkrequestForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditrequestorid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.camsworkrequestForm.get('requestorid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassetid( assetid) {
/*let ScreenType='2';
this.dialog.open(camsassetmasterComponent, 
{
data: {assetid:this.camsworkrequestForm.get('assetid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.camsworkrequestForm.get('locationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsublocationid( sublocationid) {
/*let ScreenType='2';
this.dialog.open(bobranchsublocationComponent, 
{
data: {sublocationid:this.camsworkrequestForm.get('sublocationid').value, ScreenType:2 }
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



