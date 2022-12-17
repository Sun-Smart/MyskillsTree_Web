import { camsassettransferService } from './../../../service/camsassettransfer.service';
import { camsassettransfer } from './../../../model/camsassettransfer.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { hrmsemployee} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
//popups
//detail table services
import { camsassettransferdetail } from './../../../model/camsassettransferdetail.model';
import { camsassettransferdetailComponent } from './../../../pages/forms/camsassettransferdetail/camsassettransferdetail.component';
//FK services
import { camsassetmaster,IcamsassetmasterResponse } from './../../../model/camsassetmaster.model';
import { camsassetmasterComponent } from './../../../pages/forms/camsassetmaster/camsassetmaster.component';
import { camsassetmasterService } from './../../../service/camsassetmaster.service';
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
selector: 'app-camsassettransfer',
templateUrl: './camsassettransfer.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsassettransferComponent implements OnInit {
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
bfilterPopulatecamsassettransfers:boolean=false;
datacamsassettransferstransfertype3:any=[];
datacamsassettransfersfromdepartment3:any=[];
datacamsassettransferscurrentlocation3:any=[];
datacamsassettransfersfromemployee3:any=[];
datacamsassettransferstodepartment3:any=[];
datacamsassettransfersnewlocation3:any=[];
datacamsassettransferstoemployee3:any=[];
datacamsassettransferdetailsassetid3:any=[];
bfilterPopulatecamsassettransferdetails:boolean=false;
@ViewChild('tblcamsassettransferdetailssource',{static:false}) tblcamsassettransferdetailssource: Ng2SmartTableComponent;
 camsassettransferForm: FormGroup;
transfertypeList: boconfigvalue[];
fromdepartmentList: bomasterdata[];
currentlocationList: bobranchlocation[];
currentlocationoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
currentlocation_bobranchlocationsForm: FormGroup;//autocomplete
currentlocation_bobranchlocationsoptions:any;//autocomplete
currentlocation_bobranchlocationsformatter:any;//autocomplete
fromemployeeList: hrmsemployee[];
todepartmentList: bomasterdata[];
newlocationList: bobranchlocation[];
newlocationoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
newlocation_bobranchlocationsForm: FormGroup;//autocomplete
newlocation_bobranchlocationsoptions:any;//autocomplete
newlocation_bobranchlocationsformatter:any;//autocomplete
toemployeeList: hrmsemployee[];
toemployeeoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
toemployee_hrmsemployeesForm: FormGroup;//autocomplete
toemployee_hrmsemployeesoptions:any;//autocomplete
toemployee_hrmsemployeesformatter:any;//autocomplete
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
camsassettransfershowOption:boolean;
camsassettransferdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



camsassettransferdetailsvisiblelist:any;
camsassettransferdetailshidelist:any;

DeletedcamsassettransferdetailIDs: string="";
camsassettransferdetailsID: string = "1";
camsassettransferdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private camsassettransferservice: camsassettransferService,
private camsassetmasterservice: camsassetmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private bobranchlocationservice:bobranchlocationService,
private hrmsemployeeservice:hrmsemployeeService,
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
this.camsassettransferForm  = this.fb.group({
pk:[null],
ImageName: [null],
transferid: [null],
transferdate: [null, Validators.required],
transfertype: [null],
transfertypedesc: [null],
reference: [null],
fromdepartment: [null],
fromdepartmentdesc: [null],
currentlocation: [null, Validators.required],
currentlocationdesc: [null],
fromemployee: [null],
fromemployeedesc: [null],
building: [null],
room: [null],
todepartment: [null],
todepartmentdesc: [null],
newlocation: [null, Validators.required],
newlocationdesc: [null],
toemployee: [null],
toemployeedesc: [null],
tobuilding: [null],
toroom: [null],
transferreason: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsassettransferForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsassettransferForm.dirty && this.camsassettransferForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.transferid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.transferid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.transferid && pkDetail) {
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
let camsassettransferid = null;

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
this.formid=camsassettransferid;
//this.sharedService.alert(camsassettransferid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcamsassettransferdetailsTableConfig();
  setTimeout(() => {
  this.SetcamsassettransferdetailsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("transfertype").then(res => this.transfertypeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("qghhe").then(res => {
this.fromdepartmentList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.currentlocationList = res as bobranchlocation[];
if(this.camsassettransferservice.formData && this.camsassettransferservice.formData.currentlocation){
this.currentlocationoptionsEvent.emit(this.currentlocationList);
this.camsassettransferForm.patchValue({
    currentlocation: this.camsassettransferservice.formData.currentlocation,
    currentlocationdesc: this.camsassettransferservice.formData.currentlocationdesc,
});
}
{
let arrcurrentlocation = this.currentlocationList.filter(v => v.locationid == this.camsassettransferForm.get('currentlocation').value);
let objcurrentlocation;
if (arrcurrentlocation.length > 0) objcurrentlocation = arrcurrentlocation[0];
if (objcurrentlocation)
{
}
}
}
).catch((err) => {console.log(err);});
this.currentlocation_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.currentlocationList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.currentlocation_bobranchlocationsformatter = (result: any) => result.locationname;
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.fromemployeeList = res as hrmsemployee[];
}
).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("qghhe").then(res => {
this.todepartmentList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.newlocationList = res as bobranchlocation[];
if(this.camsassettransferservice.formData && this.camsassettransferservice.formData.newlocation){
this.newlocationoptionsEvent.emit(this.newlocationList);
this.camsassettransferForm.patchValue({
    newlocation: this.camsassettransferservice.formData.newlocation,
    newlocationdesc: this.camsassettransferservice.formData.newlocationdesc,
});
}
{
let arrnewlocation = this.newlocationList.filter(v => v.locationid == this.camsassettransferForm.get('newlocation').value);
let objnewlocation;
if (arrnewlocation.length > 0) objnewlocation = arrnewlocation[0];
if (objnewlocation)
{
}
}
}
).catch((err) => {console.log(err);});
this.newlocation_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.newlocationList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.newlocation_bobranchlocationsformatter = (result: any) => result.locationname;
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.toemployeeList = res as hrmsemployee[];
if(this.camsassettransferservice.formData && this.camsassettransferservice.formData.toemployee){
this.toemployeeoptionsEvent.emit(this.toemployeeList);
this.camsassettransferForm.patchValue({
    toemployee: this.camsassettransferservice.formData.toemployee,
    toemployeedesc: this.camsassettransferservice.formData.toemployeedesc,
});
}
{
let arrtoemployee = this.toemployeeList.filter(v => v.employeeid == this.camsassettransferForm.get('toemployee').value);
let objtoemployee;
if (arrtoemployee.length > 0) objtoemployee = arrtoemployee[0];
if (objtoemployee)
{
}
}
}
).catch((err) => {console.log(err);});
this.toemployee_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.toemployeeList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.toemployee_hrmsemployeesformatter = (result: any) => result.employeename;

//autocomplete
    this.camsassettransferservice.getcamsassettransfersList().then(res => {
      this.pkList = res as camsassettransfer[];
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
this.camsassettransferForm.markAsUntouched();
this.camsassettransferForm.markAsPristine();
}
onSelectedcurrentlocation(currentlocationDetail: any) {
if (currentlocationDetail.locationid && currentlocationDetail) {
this.camsassettransferForm.patchValue({
currentlocation: currentlocationDetail.locationid,
currentlocationdesc: currentlocationDetail.locationname,

});

}
}

onSelectednewlocation(newlocationDetail: any) {
if (newlocationDetail.locationid && newlocationDetail) {
this.camsassettransferForm.patchValue({
newlocation: newlocationDetail.locationid,
newlocationdesc: newlocationDetail.locationname,

});

}
}

onSelectedtoemployee(toemployeeDetail: any) {
if (toemployeeDetail.employeeid && toemployeeDetail) {
this.camsassettransferForm.patchValue({
toemployee: toemployeeDetail.employeeid,
toemployeedesc: toemployeeDetail.employeename,

});

}
}




resetForm() {
if (this.camsassettransferForm != null)
this.camsassettransferForm.reset();
this.camsassettransferForm.patchValue({
});
this.camsassettransferForm.patchValue({
transferdate: this.ngbDateParserFormatter.parse(new Date().toString()),
});
setTimeout(() => {
this.camsassettransferservice.camsassettransferdetails=[];
this.camsassettransferdetailsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let transferid = this.camsassettransferForm.get('transferid').value;
        if(transferid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsassettransferservice.deletecamsassettransfer(transferid).then(res =>
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
    this.camsassettransferForm.patchValue({
        transferid: null
    });
    if(this.camsassettransferservice.formData.transferid!=null)this.camsassettransferservice.formData.transferid=null;
for (let i=0;i<this.camsassettransferservice.camsassettransferdetails.length;i++) {
this.camsassettransferservice.camsassettransferdetails[i].transferdetailid=null;
}
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
        else if(key=="transferdate")
this.camsassettransferForm.patchValue({"transferdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="remarks")
this.camsassettransferForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.camsassettransferForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsassettransferForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsassettransferForm.controls[key]!=undefined)
{
this.camsassettransferForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("camsassettransfers",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
transferidonChange(evt:any){
let e=evt.value;
}
transferdateonChange(evt:any){
let e=evt.value;
}
transfertypeonChange(evt:any){
let e=this.f.transfertype.value as any;
this.camsassettransferForm.patchValue({transfertypedesc:evt.options[evt.options.selectedIndex].text});
}
referenceonChange(evt:any){
let e=evt.value;
}
fromdepartmentonChange(evt:any){
let e=evt.value;
this.camsassettransferForm.patchValue({fromdepartmentdesc:evt.options[evt.options.selectedIndex].text});
}
currentlocationonChange(evt:any){
let e=evt.value;
}
fromemployeeonChange(evt:any){
let e=evt.value;
this.camsassettransferForm.patchValue({fromemployeedesc:evt.options[evt.options.selectedIndex].text});
}
buildingonChange(evt:any){
let e=evt.value;
}
roomonChange(evt:any){
let e=evt.value;
}
todepartmentonChange(evt:any){
let e=evt.value;
this.camsassettransferForm.patchValue({todepartmentdesc:evt.options[evt.options.selectedIndex].text});
}
newlocationonChange(evt:any){
let e=evt.value;
}
toemployeeonChange(evt:any){
let e=evt.value;
}
tobuildingonChange(evt:any){
let e=evt.value;
}
toroomonChange(evt:any){
let e=evt.value;
}
transferreasononChange(evt:any){
let e=evt.value;
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
  


editcamsassettransfers() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsassettransferservice.getcamsassettransfersByEID(pkcol).then(res => {

this.camsassettransferservice.formData=res.camsassettransfer;
let formproperty=res.camsassettransfer.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsassettransfer.pkcol;
this.formid=res.camsassettransfer.transferid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsassettransfer.transferid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsassettransferForm.patchValue({
transferid: res.camsassettransfer.transferid,
transferdate: this.ngbDateParserFormatter.parse(res.camsassettransfer.transferdate),
transfertype: res.camsassettransfer.transfertype,
transfertypedesc: res.camsassettransfer.transfertypedesc,
reference: res.camsassettransfer.reference,
fromdepartment: res.camsassettransfer.fromdepartment,
fromdepartmentdesc: res.camsassettransfer.fromdepartmentdesc,
currentlocation: res.camsassettransfer.currentlocation,
currentlocationdesc: res.camsassettransfer.currentlocationdesc,
fromemployee: res.camsassettransfer.fromemployee,
fromemployeedesc: res.camsassettransfer.fromemployeedesc,
building: res.camsassettransfer.building,
room: res.camsassettransfer.room,
todepartment: res.camsassettransfer.todepartment,
todepartmentdesc: res.camsassettransfer.todepartmentdesc,
newlocation: res.camsassettransfer.newlocation,
newlocationdesc: res.camsassettransfer.newlocationdesc,
toemployee: res.camsassettransfer.toemployee,
toemployeedesc: res.camsassettransfer.toemployeedesc,
tobuilding: res.camsassettransfer.tobuilding,
toroom: res.camsassettransfer.toroom,
transferreason: res.camsassettransfer.transferreason,
remarks: JSON.parse(res.camsassettransfer.remarks),
customfield: res.camsassettransfer.customfield,
attachment: JSON.parse(res.camsassettransfer.attachment),
status: res.camsassettransfer.status,
statusdesc: res.camsassettransfer.statusdesc,
});
this.camsassettransferdetailsvisiblelist=res.camsassettransferdetailsvisiblelist;
if(this.camsassettransferForm.get('customfield').value!=null && this.camsassettransferForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.camsassettransferForm.get('customfield').value);
this.FillCustomField();
if(this.camsassettransferForm.get('attachment').value!=null && this.camsassettransferForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.camsassettransferForm.get('attachment').value);
//Child Tables if any
this.camsassettransferservice.camsassettransferdetails = res.camsassettransferdetails;
this.SetcamsassettransferdetailsTableConfig();
this.camsassettransferdetailsLoadTable();
  setTimeout(() => {
  this.SetcamsassettransferdetailsTableddConfig();
  });
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
  for (let key in this.camsassettransferForm.controls) {
    if (this.camsassettransferForm.controls[key] != null) {
if(false)
{
if(this.camsassettransferservice.formData!=null && this.camsassettransferservice.formData[key]!=null  && this.camsassettransferservice.formData[key]!='[]' && this.camsassettransferservice.formData[key]!=undefined && this.camsassettransferservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsassettransferservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsassettransferservice.formData!=null && this.camsassettransferservice.formData[key]!=null   && this.camsassettransferservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsassettransferservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsassettransferservice.formData!=null && this.camsassettransferservice.formData[key]!=null   && this.camsassettransferservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsassettransferservice.formData[key]+"'><div class='progress__number'>"+this.camsassettransferservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsassettransferForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsassettransferForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.camsassettransferForm.value;
obj.transferdate=new Date(this.camsassettransferForm.get('transferdate').value ? this.ngbDateParserFormatter.format(this.camsassettransferForm.get('transferdate').value)+'  UTC' :null);
if(this.camsassettransferForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.camsassettransferForm.get('remarks').value);
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

private camsassettransfertoggleOption(){
this.camsassettransfershowOption = this.camsassettransfershowOption === true ? false : true;
}

private camsassettransferdetailtoggleOption(){
this.camsassettransferdetailshowOption = this.camsassettransferdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsassettransferForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsassettransferForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsassettransferForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsassettransferservice.formData=this.camsassettransferForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsassettransferForm.controls[key] != null)
    {
        this.camsassettransferservice.formData[key] = this.camsassettransferForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.camsassettransferservice.formData.transferdate=new Date(this.camsassettransferForm.get('transferdate').value ? this.ngbDateParserFormatter.format(this.camsassettransferForm.get('transferdate').value)+'  UTC' :null);
if(this.camsassettransferForm.get('remarks').value!=null)this.camsassettransferservice.formData.remarks=JSON.stringify(this.camsassettransferForm.get('remarks').value);
if(customfields!=null)this.camsassettransferservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.camsassettransferservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.camsassettransferservice.formData.DeletedcamsassettransferdetailIDs = this.DeletedcamsassettransferdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.camsassettransferservice.formData);
this.camsassettransferservice.formData=this.camsassettransferForm.value;
this.camsassettransferservice.saveOrUpdatecamsassettransfers().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.camsassettransferdetailssource.data)
{
    for (let i = 0; i < this.camsassettransferdetailssource.data.length; i++)
    {
        if (this.camsassettransferdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.camsassettransferdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsassettransfer);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsassettransferservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsassettransfer);
}
else
{
this.FillData(res);
}
}
this.camsassettransferForm.markAsUntouched();
this.camsassettransferForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditfromdepartment( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.camsassettransferForm.get('fromdepartment').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcurrentlocation( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.camsassettransferForm.get('currentlocation').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditfromemployee( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.camsassettransferForm.get('fromemployee').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittodepartment( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.camsassettransferForm.get('todepartment').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditnewlocation( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.camsassettransferForm.get('newlocation').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittoemployee( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.camsassettransferForm.get('toemployee').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcamsassettransferdetail(event:any,transferdetailid:any, transferid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(camsassettransferdetailComponent, 
{
data:  {  showview:false,save:false,event,transferdetailid, transferid,visiblelist:this.camsassettransferdetailsvisiblelist,  hidelist:this.camsassettransferdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.camsassettransferdetailssource.add(res);
this.camsassettransferdetailssource.refresh();
}
else
{
this.camsassettransferdetailssource.update(event.data, res);
}
}
});
}

onDeletecamsassettransferdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcamsassettransferdetailIDs += childID + ",";
this.camsassettransferservice.camsassettransferdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes camsassettransferdetails
camsassettransferdetailssettings:any;
camsassettransferdetailssource: any;

showcamsassettransferdetailsCheckbox()
{
debugger;
if(this.tblcamsassettransferdetailssource.settings['selectMode']== 'multi')this.tblcamsassettransferdetailssource.settings['selectMode']= 'single';
else
this.tblcamsassettransferdetailssource.settings['selectMode']= 'multi';
this.tblcamsassettransferdetailssource.initGrid();
}
deletecamsassettransferdetailsAll()
{
this.tblcamsassettransferdetailssource.settings['selectMode'] = 'single';
}
showcamsassettransferdetailsFilter()
{
  setTimeout(() => {
  this.SetcamsassettransferdetailsTableddConfig();
  });
      if(this.tblcamsassettransferdetailssource.settings!=null)this.tblcamsassettransferdetailssource.settings['hideSubHeader'] =!this.tblcamsassettransferdetailssource.settings['hideSubHeader'];
this.tblcamsassettransferdetailssource.initGrid();
}
showcamsassettransferdetailsInActive()
{
}
enablecamsassettransferdetailsInActive()
{
}
async SetcamsassettransferdetailsTableddConfig()
{
if(!this.bfilterPopulatecamsassettransferdetails){

this.camsassetmasterservice.getcamsassetmastersList().then(res=>
{
var dataassetid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datacamsassettransferdetailsassetid3.push(defaultobj);
for(let i=0; i<dataassetid2.length; i++){
var obj= { value: dataassetid2[i].assetid, title:dataassetid2[i].description};
this.datacamsassettransferdetailsassetid3.push(obj);
}
if((this.tblcamsassettransferdetailssource.settings as any).columns['assetid'])
{
(this.tblcamsassettransferdetailssource.settings as any).columns['assetid'].editor.config.list=JSON.parse(JSON.stringify(this.datacamsassettransferdetailsassetid3));
this.tblcamsassettransferdetailssource.initGrid();
}
});
}
this.bfilterPopulatecamsassettransferdetails=true;
}
async camsassettransferdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcamsassettransferdetailsTableConfig()
{
this.camsassettransferdetailssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
branchid: {
title: 'Branch',
type: 'number',
filter:true,
},
assetid: {
title: 'Asset',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'poe5x',reportcode:'poe5x',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datacamsassettransferdetailsassetid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
transferqty: {
title: 'Transfer Qty',
type: '',
filter:true,
},
originalcost: {
title: 'Original Cost',
type: '',
filter:true,
},
accumulateddepriciation: {
title: 'Accumulated Depriciation',
type: '',
filter:true,
},
wdv: {
title: 'W D V',
type: '',
filter:true,
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
camsassettransferdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassettransferdetailsID)>=0)
{
this.camsassettransferdetailssource=new LocalDataSource();
this.camsassettransferdetailssource.load(this.camsassettransferservice.camsassettransferdetails as  any as LocalDataSource);
this.camsassettransferdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
camsassettransferdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.camsassettransferservice.camsassettransferdetails.length == 0)
{
    this.tblcamsassettransferdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new camsassettransferdetail();
    this.camsassettransferservice.camsassettransferdetails.push(obj);
    this.camsassettransferdetailssource.refresh();
    if ((this.camsassettransferservice.camsassettransferdetails.length / this.camsassettransferdetailssource.getPaging().perPage).toFixed(0) + 1 != this.camsassettransferdetailssource.getPaging().page)
    {
        this.camsassettransferdetailssource.setPage((this.camsassettransferservice.camsassettransferdetails.length / this.camsassettransferdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcamsassettransferdetailssource.grid.edit(this.tblcamsassettransferdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.camsassettransferdetailssource.data.indexOf(event.data);
this.onDeletecamsassettransferdetail(event,event.data.transferdetailid,((this.camsassettransferdetailssource.getPaging().page-1) *this.camsassettransferdetailssource.getPaging().perPage)+index);
this.camsassettransferdetailssource.refresh();
break;
}
}

*/
camsassettransferdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcamsassettransferdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcamsassettransferdetail(event,event.data.transferdetailid,this.formid);
break;
case 'delete':
this.onDeletecamsassettransferdetail(event,event.data.transferdetailid,((this.camsassettransferdetailssource.getPaging().page-1) *this.camsassettransferdetailssource.getPaging().perPage)+event.index);
this.camsassettransferdetailssource.refresh();
break;
}
}
camsassettransferdetailsonDelete(obj) {
let transferdetailid=obj.data.transferdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.camsassettransferservice.deletecamsassettransfer(transferdetailid).then(res=>
this.camsassettransferdetailsLoadTable()
);
}
}
camsassettransferdetailsPaging(val)
{
debugger;
this.camsassettransferdetailssource.setPaging(1, val, true);
}

handlecamsassettransferdetailsGridSelected(event:any) {
this.camsassettransferdetailsselectedindex=this.camsassettransferservice.camsassettransferdetails.findIndex(i => i.transferdetailid === event.data.transferdetailid);
}
IscamsassettransferdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.camsassettransferdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes camsassettransferdetails

}



