import { legalcasehearingService } from './../../../service/legalcasehearing.service';
import { legalcasehearing } from './../../../model/legalcasehearing.model';
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
import { legallawyermaster} from './../../../model/legallawyermaster.model';
import { legallawyermasterComponent } from './../../../pages/forms/legallawyermaster/legallawyermaster.component';
import { legallawyermasterService } from './../../../service/legallawyermaster.service';
//popups
//detail table services
import { boexpense } from '../../../../../../n-tire-bo-app/src/app/model/boexpense.model';
import { boexpenseComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boexpense/boexpense.component';
//FK services
import { erpfacostcenter,IerpfacostcenterResponse } from '../../../../../../n-tire-finance-app/src/app/model/erpfacostcenter.model';
import { erpfacostcenterComponent } from '../../../../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.component';
import { erpfacostcenterService } from '../../../../../../n-tire-finance-app/src/app/service/erpfacostcenter.service';
import { bousermaster,IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { legalcasehearingdetailnote } from './../../../model/legalcasehearingdetailnote.model';
import { legalcasehearingdetailnoteComponent } from './../../../pages/forms/legalcasehearingdetailnote/legalcasehearingdetailnote.component';
//FK services
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

@Component({
selector: 'app-legalcasehearing',
templateUrl: './legalcasehearing.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalcasehearingComponent implements OnInit {
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
bfilterPopulatelegalcasehearings:boolean=false;
datalegalcasehearingslawyerid3:any=[];
datalegalcasehearingsadditionallawyerid13:any=[];
datalegalcasehearingsadditionallawyerid23:any=[];
databoexpensescostcenterid3:any=[];
databoexpensesrequesteduserid3:any=[];
databoexpensesexpensetype3:any=[];
databoexpensesexpensecategory3:any=[];
databoexpensescurrency3:any=[];
databoexpensesbasecurrency3:any=[];
bfilterPopulateboexpenses:boolean=false;
bfilterPopulatelegalcasehearingdetailnotes:boolean=false;
@ViewChild('tblboexpensessource',{static:false}) tblboexpensessource: Ng2SmartTableComponent;
@ViewChild('tbllegalcasehearingdetailnotessource',{static:false}) tbllegalcasehearingdetailnotessource: Ng2SmartTableComponent;
 legalcasehearingForm: FormGroup;
lawyeridList: legallawyermaster[];
lawyeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
lawyerid_legallawyermastersForm: FormGroup;//autocomplete
lawyerid_legallawyermastersoptions:any;//autocomplete
lawyerid_legallawyermastersformatter:any;//autocomplete
additionallawyerid1List: legallawyermaster[];
additionallawyerid1optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
additionallawyerid1_legallawyermastersForm: FormGroup;//autocomplete
additionallawyerid1_legallawyermastersoptions:any;//autocomplete
additionallawyerid1_legallawyermastersformatter:any;//autocomplete
additionallawyerid2List: legallawyermaster[];
additionallawyerid2optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
additionallawyerid2_legallawyermastersForm: FormGroup;//autocomplete
additionallawyerid2_legallawyermastersoptions:any;//autocomplete
additionallawyerid2_legallawyermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;
SESSIONUSERID:any;//current user
legalcasehearingshowOption:boolean;
boexpenseshowOption:boolean;
legalcasehearingdetailnoteshowOption:boolean;
sessiondata:any;
sourcekey:any;



boexpensesvisiblelist:any;
boexpenseshidelist:any;
legalcasehearingdetailnotesvisiblelist:any;
legalcasehearingdetailnoteshidelist:any;

DeletedboexpenseIDs: string="";
boexpensesID: string = "1";
boexpensesselectedindex:any;
DeletedlegalcasehearingdetailnoteIDs: string="";
legalcasehearingdetailnotesID: string = "2";
legalcasehearingdetailnotesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private legalcasehearingservice: legalcasehearingService,
private erpfacostcenterservice: erpfacostcenterService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private legallawyermasterservice:legallawyermasterService,
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
this.legalcasehearingForm  = this.fb.group({
pk:[null],
ImageName: [null],
hearingid: [null],
caseid: [null],
hearingdate: [null],
lawyerid: [null],
lawyeriddesc: [null],
additionallawyerid1: [null],
additionallawyerid1desc: [null],
additionallawyerid2: [null],
additionallawyerid2desc: [null],
remarks: [null],
actiontobetaken: [null],
nexthearingdate: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalcasehearingForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalcasehearingForm.dirty && this.legalcasehearingForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.hearingid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.hearingid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.hearingid && pkDetail) {
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
let legalcasehearingid = null;

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
this.formid=legalcasehearingid;
//this.sharedService.alert(legalcasehearingid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetboexpensesTableConfig();
  setTimeout(() => {
  this.SetboexpensesTableddConfig();
  });

this.SetlegalcasehearingdetailnotesTableConfig();
  setTimeout(() => {
  this.SetlegalcasehearingdetailnotesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.legallawyermasterservice.getlegallawyermastersList().then(res => 
{
this.lawyeridList = res as legallawyermaster[];
if(this.legalcasehearingservice.formData && this.legalcasehearingservice.formData.lawyerid){
this.lawyeridoptionsEvent.emit(this.lawyeridList);
this.legalcasehearingForm.patchValue({
    lawyerid: this.legalcasehearingservice.formData.lawyerid,
    lawyeriddesc: this.legalcasehearingservice.formData.lawyeriddesc,
});
}
{
let arrlawyerid = this.lawyeridList.filter(v => v.lawyerid == this.legalcasehearingForm.get('lawyerid').value);
let objlawyerid;
if (arrlawyerid.length > 0) objlawyerid = arrlawyerid[0];
if (objlawyerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.lawyerid_legallawyermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.lawyeridList.filter(v => v.lawyername.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.lawyerid_legallawyermastersformatter = (result: any) => result.lawyername;
this.legallawyermasterservice.getlegallawyermastersList().then(res => 
{
this.additionallawyerid1List = res as legallawyermaster[];
if(this.legalcasehearingservice.formData && this.legalcasehearingservice.formData.additionallawyerid1){
this.additionallawyerid1optionsEvent.emit(this.additionallawyerid1List);
this.legalcasehearingForm.patchValue({
    additionallawyerid1: this.legalcasehearingservice.formData.additionallawyerid1,
    additionallawyerid1desc: this.legalcasehearingservice.formData.additionallawyerid1desc,
});
}
{
let arradditionallawyerid1 = this.additionallawyerid1List.filter(v => v.lawyerid == this.legalcasehearingForm.get('additionallawyerid1').value);
let objadditionallawyerid1;
if (arradditionallawyerid1.length > 0) objadditionallawyerid1 = arradditionallawyerid1[0];
if (objadditionallawyerid1)
{
}
}
}
).catch((err) => {console.log(err);});
this.additionallawyerid1_legallawyermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.additionallawyerid1List.filter(v => v.lawyername.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.additionallawyerid1_legallawyermastersformatter = (result: any) => result.lawyername;
this.legallawyermasterservice.getlegallawyermastersList().then(res => 
{
this.additionallawyerid2List = res as legallawyermaster[];
if(this.legalcasehearingservice.formData && this.legalcasehearingservice.formData.additionallawyerid2){
this.additionallawyerid2optionsEvent.emit(this.additionallawyerid2List);
this.legalcasehearingForm.patchValue({
    additionallawyerid2: this.legalcasehearingservice.formData.additionallawyerid2,
    additionallawyerid2desc: this.legalcasehearingservice.formData.additionallawyerid2desc,
});
}
{
let arradditionallawyerid2 = this.additionallawyerid2List.filter(v => v.lawyerid == this.legalcasehearingForm.get('additionallawyerid2').value);
let objadditionallawyerid2;
if (arradditionallawyerid2.length > 0) objadditionallawyerid2 = arradditionallawyerid2[0];
if (objadditionallawyerid2)
{
}
}
}
).catch((err) => {console.log(err);});
this.additionallawyerid2_legallawyermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.additionallawyerid2List.filter(v => v.lawyername.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.additionallawyerid2_legallawyermastersformatter = (result: any) => result.lawyername;

//autocomplete
    this.legalcasehearingservice.getlegalcasehearingsList().then(res => {
      this.pkList = res as legalcasehearing[];
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
this.legalcasehearingForm.markAsUntouched();
this.legalcasehearingForm.markAsPristine();
}
onSelectedlawyerid(lawyeridDetail: any) {
if (lawyeridDetail.lawyerid && lawyeridDetail) {
this.legalcasehearingForm.patchValue({
lawyerid: lawyeridDetail.lawyerid,
lawyeriddesc: lawyeridDetail.lawyername,

});

}
}

onSelectedadditionallawyerid1(additionallawyerid1Detail: any) {
if (additionallawyerid1Detail.lawyerid && additionallawyerid1Detail) {
this.legalcasehearingForm.patchValue({
additionallawyerid1: additionallawyerid1Detail.lawyerid,
additionallawyerid1desc: additionallawyerid1Detail.lawyername,

});

}
}

onSelectedadditionallawyerid2(additionallawyerid2Detail: any) {
if (additionallawyerid2Detail.lawyerid && additionallawyerid2Detail) {
this.legalcasehearingForm.patchValue({
additionallawyerid2: additionallawyerid2Detail.lawyerid,
additionallawyerid2desc: additionallawyerid2Detail.lawyername,

});

}
}




resetForm() {
if (this.legalcasehearingForm != null)
this.legalcasehearingForm.reset();
this.legalcasehearingForm.patchValue({
});
setTimeout(() => {
this.legalcasehearingservice.boexpenses=[];
this.boexpensesLoadTable();
this.legalcasehearingservice.legalcasehearingdetailnotes=[];
this.legalcasehearingdetailnotesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let hearingid = this.legalcasehearingForm.get('hearingid').value;
        if(hearingid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalcasehearingservice.deletelegalcasehearing(hearingid).then(res =>
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
    this.legalcasehearingForm.patchValue({
        hearingid: null
    });
    if(this.legalcasehearingservice.formData.hearingid!=null)this.legalcasehearingservice.formData.hearingid=null;
for (let i=0;i<this.legalcasehearingservice.boexpenses.length;i++) {
this.legalcasehearingservice.boexpenses[i].expenseid=null;
}
for (let i=0;i<this.legalcasehearingservice.legalcasehearingdetailnotes.length;i++) {
this.legalcasehearingservice.legalcasehearingdetailnotes[i].hearingnoteid=null;
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
        else if(key=="hearingdate")
this.legalcasehearingForm.patchValue({"hearingdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="nexthearingdate")
this.legalcasehearingForm.patchValue({"nexthearingdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.legalcasehearingForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcasehearingForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcasehearingForm.controls[key]!=undefined)
{
this.legalcasehearingForm.controls[key].disable({onlySelf: true});
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
hearingidonChange(evt:any){
let e=evt.value;
}
caseidonChange(evt:any){
let e=evt.value;
}
hearingdateonChange(evt:any){
let e=evt.value;
}
lawyeridonChange(evt:any){
let e=evt.value;
}
additionallawyerid1onChange(evt:any){
let e=evt.value;
}
additionallawyerid2onChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
actiontobetakenonChange(evt:any){
let e=evt.value;
}
nexthearingdateonChange(evt:any){
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
  


editlegalcasehearings() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalcasehearingservice.getlegalcasehearingsByEID(pkcol).then(res => {

this.legalcasehearingservice.formData=res.legalcasehearing;
let formproperty=res.legalcasehearing.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalcasehearing.pkcol;
this.formid=res.legalcasehearing.hearingid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalcasehearingservice.formData=res.legalcasehearing;
this.formid=res.legalcasehearing.hearingid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalcasehearingForm.patchValue({
hearingid: res.legalcasehearing.hearingid,
caseid: res.legalcasehearing.caseid,
hearingdate: this.ngbDateParserFormatter.parse(res.legalcasehearing.hearingdate),
lawyerid: res.legalcasehearing.lawyerid,
lawyeriddesc: res.legalcasehearing.lawyeriddesc,
additionallawyerid1: res.legalcasehearing.additionallawyerid1,
additionallawyerid1desc: res.legalcasehearing.additionallawyerid1desc,
additionallawyerid2: res.legalcasehearing.additionallawyerid2,
additionallawyerid2desc: res.legalcasehearing.additionallawyerid2desc,
remarks: res.legalcasehearing.remarks,
actiontobetaken: res.legalcasehearing.actiontobetaken,
nexthearingdate: this.ngbDateParserFormatter.parse(res.legalcasehearing.nexthearingdate),
attachment: JSON.parse(res.legalcasehearing.attachment),
status: res.legalcasehearing.status,
statusdesc: res.legalcasehearing.statusdesc,
});
this.boexpensesvisiblelist=res.boexpensesvisiblelist;
this.legalcasehearingdetailnotesvisiblelist=res.legalcasehearingdetailnotesvisiblelist;
if(this.legalcasehearingForm.get('attachment').value!=null && this.legalcasehearingForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legalcasehearingForm.get('attachment').value);
//Child Tables if any
this.legalcasehearingservice.boexpenses = res.boexpenses;
this.SetboexpensesTableConfig();
this.boexpensesLoadTable();
  setTimeout(() => {
  this.SetboexpensesTableddConfig();
  });
this.legalcasehearingservice.legalcasehearingdetailnotes = res.legalcasehearingdetailnotes;
this.SetlegalcasehearingdetailnotesTableConfig();
this.legalcasehearingdetailnotesLoadTable();
  setTimeout(() => {
  this.SetlegalcasehearingdetailnotesTableddConfig();
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
  for (let key in this.legalcasehearingForm.controls) {
    if (this.legalcasehearingForm.controls[key] != null) {
if(false)
{
if(this.legalcasehearingservice.formData!=null && this.legalcasehearingservice.formData[key]!=null  && this.legalcasehearingservice.formData[key]!='[]' && this.legalcasehearingservice.formData[key]!=undefined && this.legalcasehearingservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcasehearingservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalcasehearingservice.formData!=null && this.legalcasehearingservice.formData[key]!=null   && this.legalcasehearingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalcasehearingservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalcasehearingservice.formData!=null && this.legalcasehearingservice.formData[key]!=null   && this.legalcasehearingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalcasehearingservice.formData[key]+"'><div class='progress__number'>"+this.legalcasehearingservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcasehearingForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalcasehearingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legalcasehearingForm.value;
obj.hearingdate=new Date(this.legalcasehearingForm.get('hearingdate').value ? this.ngbDateParserFormatter.format(this.legalcasehearingForm.get('hearingdate').value)+'  UTC' :null);
obj.nexthearingdate=new Date(this.legalcasehearingForm.get('nexthearingdate').value ? this.ngbDateParserFormatter.format(this.legalcasehearingForm.get('nexthearingdate').value)+'  UTC' :null);
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

private legalcasehearingtoggleOption(){
this.legalcasehearingshowOption = this.legalcasehearingshowOption === true ? false : true;
}

private boexpensetoggleOption(){
this.boexpenseshowOption = this.boexpenseshowOption === true ? false : true;
}

private legalcasehearingdetailnotetoggleOption(){
this.legalcasehearingdetailnoteshowOption = this.legalcasehearingdetailnoteshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcasehearingForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcasehearingForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcasehearingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalcasehearingservice.formData=this.legalcasehearingForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcasehearingForm.controls[key] != null)
    {
        this.legalcasehearingservice.formData[key] = this.legalcasehearingForm.controls[key].value;
    }
}
}
}
this.legalcasehearingservice.formData.hearingdate=new Date(this.legalcasehearingForm.get('hearingdate').value ? this.ngbDateParserFormatter.format(this.legalcasehearingForm.get('hearingdate').value)+'  UTC' :null);
this.legalcasehearingservice.formData.nexthearingdate=new Date(this.legalcasehearingForm.get('nexthearingdate').value ? this.ngbDateParserFormatter.format(this.legalcasehearingForm.get('nexthearingdate').value)+'  UTC' :null);
if(this.fileattachment.getattachmentlist()!=null)this.legalcasehearingservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.legalcasehearingservice.formData.DeletedboexpenseIDs = this.DeletedboexpenseIDs;
this.legalcasehearingservice.formData.DeletedlegalcasehearingdetailnoteIDs = this.DeletedlegalcasehearingdetailnoteIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legalcasehearingservice.formData);
this.legalcasehearingservice.formData=this.legalcasehearingForm.value;
this.legalcasehearingservice.saveOrUpdatelegalcasehearings().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.boexpensessource.data)
{
    for (let i = 0; i < this.boexpensessource.data.length; i++)
    {
        if (this.boexpensessource.data[i].fileattachmentlist)await this.sharedService.upload(this.boexpensessource.data[i].fileattachmentlist);
    }
}
if (this.legalcasehearingdetailnotessource.data)
{
    for (let i = 0; i < this.legalcasehearingdetailnotessource.data.length; i++)
    {
        if (this.legalcasehearingdetailnotessource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcasehearingdetailnotessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcasehearing);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalcasehearingservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcasehearing);
}
else
{
this.FillData(res);
}
}
this.legalcasehearingForm.markAsUntouched();
this.legalcasehearingForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditlawyerid( lawyerid) {
/*let ScreenType='2';
this.dialog.open(legallawyermasterComponent, 
{
data: {lawyerid:this.legalcasehearingForm.get('lawyerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditadditionallawyerid1( lawyerid) {
/*let ScreenType='2';
this.dialog.open(legallawyermasterComponent, 
{
data: {lawyerid:this.legalcasehearingForm.get('additionallawyerid1').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditadditionallawyerid2( lawyerid) {
/*let ScreenType='2';
this.dialog.open(legallawyermasterComponent, 
{
data: {lawyerid:this.legalcasehearingForm.get('additionallawyerid2').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditboexpense(event:any,expenseid:any, hearingid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boexpenseComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,expenseid, hearingid,visiblelist:this.boexpensesvisiblelist,  hidelist:this.boexpenseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boexpensessource.add(res);
this.boexpensessource.refresh();
}
else
{
this.boexpensessource.update(event.data, res);
}
}
});
}

onDeleteboexpense(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboexpenseIDs += childID + ",";
this.legalcasehearingservice.boexpenses.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlegalcasehearingdetailnote(event:any,hearingnoteid:any, hearingid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalcasehearingdetailnoteComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,hearingnoteid, hearingid,visiblelist:this.legalcasehearingdetailnotesvisiblelist,  hidelist:this.legalcasehearingdetailnoteshidelist,ScreenType:2,caseid:this.legalcasehearingForm.get('caseid').value  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalcasehearingdetailnotessource.add(res);
this.legalcasehearingdetailnotessource.refresh();
}
else
{
this.legalcasehearingdetailnotessource.update(event.data, res);
}
}
});
}

onDeletelegalcasehearingdetailnote(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalcasehearingdetailnoteIDs += childID + ",";
this.legalcasehearingservice.legalcasehearingdetailnotes.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes boexpenses
boexpensessettings:any;
boexpensessource: any;

showboexpensesCheckbox()
{
debugger;
if(this.tblboexpensessource.settings['selectMode']== 'multi')this.tblboexpensessource.settings['selectMode']= 'single';
else
this.tblboexpensessource.settings['selectMode']= 'multi';
this.tblboexpensessource.initGrid();
}
deleteboexpensesAll()
{
this.tblboexpensessource.settings['selectMode'] = 'single';
}
showboexpensesFilter()
{
  setTimeout(() => {
  this.SetboexpensesTableddConfig();
  });
      if(this.tblboexpensessource.settings!=null)this.tblboexpensessource.settings['hideSubHeader'] =!this.tblboexpensessource.settings['hideSubHeader'];
this.tblboexpensessource.initGrid();
}
showboexpensesInActive()
{
}
enableboexpensesInActive()
{
}
async SetboexpensesTableddConfig()
{
if(!this.bfilterPopulateboexpenses){

this.bousermasterservice.getbousermastersList().then(res=>
{
var datarequesteduserid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensesrequesteduserid3.push(defaultobj);
for(let i=0; i<datarequesteduserid2.length; i++){
var obj= { value: datarequesteduserid2[i].userid, title:datarequesteduserid2[i].username};
this.databoexpensesrequesteduserid3.push(obj);
}
if((this.tblboexpensessource.settings as any).columns['requesteduserid'])
{
(this.tblboexpensessource.settings as any).columns['requesteduserid'].editor.config.list=JSON.parse(JSON.stringify(this.databoexpensesrequesteduserid3));
this.tblboexpensessource.initGrid();
}
});

this.configservice.getList("currency").then(res=>
{
var datacurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensescurrency3.push(defaultobj);
for(let i=0; i<datacurrency2.length; i++){
var obj= { value: datacurrency2[i].configkey, title: datacurrency2[i].configtext};
this.databoexpensescurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblboexpensessource.settings);
if(clone.columns['currency']!=undefined)clone.columns['currency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensescurrency3)), }, };
if(clone.columns['currency']!=undefined)clone.columns['currency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensescurrency3)), }, };
this.tblboexpensessource.settings =  clone;
this.tblboexpensessource.initGrid();
});

this.configservice.getList("currency").then(res=>
{
var databasecurrency2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoexpensesbasecurrency3.push(defaultobj);
for(let i=0; i<databasecurrency2.length; i++){
var obj= { value: databasecurrency2[i].configkey, title: databasecurrency2[i].configtext};
this.databoexpensesbasecurrency3.push(obj);
}
var clone = this.sharedService.clone(this.tblboexpensessource.settings);
if(clone.columns['basecurrency']!=undefined)clone.columns['basecurrency'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensesbasecurrency3)), }, };
if(clone.columns['basecurrency']!=undefined)clone.columns['basecurrency'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoexpensesbasecurrency3)), }, };
this.tblboexpensessource.settings =  clone;
this.tblboexpensessource.initGrid();
});
}
this.bfilterPopulateboexpenses=true;
}
async boexpensesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboexpensesTableConfig()
{
this.boexpensessettings = {
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
sourcereference: {
title: 'Source Reference',
type: 'number',
filter:true,
},
expensedate: {
title: 'Expense Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
requesteduserid: {
title: 'Requested User',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'e99kq',reportcode:'e99kq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensesrequesteduserid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
expensetype: {
title: 'Expense Type',
type: '',
filter:true,
},
expensecategory: {
title: 'Expense Category',
type: '',
filter:true,
},
expensedescription: {
title: 'Expense Description',
type: '',
filter:true,
},
currency: {
title: 'Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensescurrency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
amount: {
title: 'Amount',
type: 'number',
filter:true,
},
tax: {
title: 'Tax',
type: 'number',
filter:true,
},
othercharges: {
title: 'Other Charges',
type: 'number',
filter:true,
},
totalamount: {
title: 'Total Amount',
type: 'number',
filter:true,
},
merchant: {
title: 'Merchant',
type: '',
filter:true,
},
receiptattached: {
title: 'Receipt Attached',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
billable: {
title: 'Billable',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
reimbursedamount: {
title: 'Reimbursed Amount',
type: 'number',
filter:true,
},
reimburseddate: {
title: 'Reimbursed Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
referencenumber: {
title: 'Reference Number',
type: '',
filter:true,
},
basecurrency: {
title: 'Base Currency',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoexpensesbasecurrency3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
baseamount: {
title: 'Base Amount',
type: 'number',
filter:true,
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
costcenterid: {
title: 'Cost Center',
type: 'number',
filter:true,
},
customfield: {
title: 'Custom Field',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getCustomValue(cell);
return ret;
},
},
attachment: {
title: 'Attachment',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
boexpensesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boexpensesID)>=0)
{
this.boexpensessource=new LocalDataSource();
this.boexpensessource.load(this.legalcasehearingservice.boexpenses as  any as LocalDataSource);
this.boexpensessource.setPaging(1, 20, true);
}
}

//external to inline
/*
boexpensesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcasehearingservice.boexpenses.length == 0)
{
    this.tblboexpensessource.grid.createFormShown = true;
}
else
{
    let obj = new boexpense();
    this.legalcasehearingservice.boexpenses.push(obj);
    this.boexpensessource.refresh();
    if ((this.legalcasehearingservice.boexpenses.length / this.boexpensessource.getPaging().perPage).toFixed(0) + 1 != this.boexpensessource.getPaging().page)
    {
        this.boexpensessource.setPage((this.legalcasehearingservice.boexpenses.length / this.boexpensessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboexpensessource.grid.edit(this.tblboexpensessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boexpensessource.data.indexOf(event.data);
this.onDeleteboexpense(event,event.data.expenseid,((this.boexpensessource.getPaging().page-1) *this.boexpensessource.getPaging().perPage)+index);
this.boexpensessource.refresh();
break;
}
}

*/
boexpensesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboexpense(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboexpense(event,event.data.expenseid,this.formid);
break;
case 'delete':
this.onDeleteboexpense(event,event.data.expenseid,((this.boexpensessource.getPaging().page-1) *this.boexpensessource.getPaging().perPage)+event.index);
this.boexpensessource.refresh();
break;
}
}
boexpensesonDelete(obj) {
let expenseid=obj.data.expenseid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcasehearingservice.deletelegalcasehearing(expenseid).then(res=>
this.boexpensesLoadTable()
);
}
}
boexpensesPaging(val)
{
debugger;
this.boexpensessource.setPaging(1, val, true);
}

handleboexpensesGridSelected(event:any) {
this.boexpensesselectedindex=this.legalcasehearingservice.boexpenses.findIndex(i => i.expenseid === event.data.expenseid);
}
IsboexpensesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boexpensesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boexpenses
//start of Grid Codes legalcasehearingdetailnotes
legalcasehearingdetailnotessettings:any;
legalcasehearingdetailnotessource: any;

showlegalcasehearingdetailnotesCheckbox()
{
debugger;
if(this.tbllegalcasehearingdetailnotessource.settings['selectMode']== 'multi')this.tbllegalcasehearingdetailnotessource.settings['selectMode']= 'single';
else
this.tbllegalcasehearingdetailnotessource.settings['selectMode']= 'multi';
this.tbllegalcasehearingdetailnotessource.initGrid();
}
deletelegalcasehearingdetailnotesAll()
{
this.tbllegalcasehearingdetailnotessource.settings['selectMode'] = 'single';
}
showlegalcasehearingdetailnotesFilter()
{
  setTimeout(() => {
  this.SetlegalcasehearingdetailnotesTableddConfig();
  });
      if(this.tbllegalcasehearingdetailnotessource.settings!=null)this.tbllegalcasehearingdetailnotessource.settings['hideSubHeader'] =!this.tbllegalcasehearingdetailnotessource.settings['hideSubHeader'];
this.tbllegalcasehearingdetailnotessource.initGrid();
}
showlegalcasehearingdetailnotesInActive()
{
}
enablelegalcasehearingdetailnotesInActive()
{
}
async SetlegalcasehearingdetailnotesTableddConfig()
{
if(!this.bfilterPopulatelegalcasehearingdetailnotes){
}
this.bfilterPopulatelegalcasehearingdetailnotes=true;
}
async legalcasehearingdetailnotesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcasehearingdetailnotesTableConfig()
{
this.legalcasehearingdetailnotessettings = {
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
sequence: {
title: 'Sequence',
type: 'number',
filter:true,
},
notes: {
title: 'Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
claim: {
title: 'Claim',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
defence: {
title: 'Defence',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
decision: {
title: 'Decision',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
legalcasehearingdetailnotesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcasehearingdetailnotesID)>=0)
{
this.legalcasehearingdetailnotessource=new LocalDataSource();
this.legalcasehearingdetailnotessource.load(this.legalcasehearingservice.legalcasehearingdetailnotes as  any as LocalDataSource);
this.legalcasehearingdetailnotessource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalcasehearingdetailnotesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcasehearingservice.legalcasehearingdetailnotes.length == 0)
{
    this.tbllegalcasehearingdetailnotessource.grid.createFormShown = true;
}
else
{
    let obj = new legalcasehearingdetailnote();
    this.legalcasehearingservice.legalcasehearingdetailnotes.push(obj);
    this.legalcasehearingdetailnotessource.refresh();
    if ((this.legalcasehearingservice.legalcasehearingdetailnotes.length / this.legalcasehearingdetailnotessource.getPaging().perPage).toFixed(0) + 1 != this.legalcasehearingdetailnotessource.getPaging().page)
    {
        this.legalcasehearingdetailnotessource.setPage((this.legalcasehearingservice.legalcasehearingdetailnotes.length / this.legalcasehearingdetailnotessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcasehearingdetailnotessource.grid.edit(this.tbllegalcasehearingdetailnotessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcasehearingdetailnotessource.data.indexOf(event.data);
this.onDeletelegalcasehearingdetailnote(event,event.data.hearingnoteid,((this.legalcasehearingdetailnotessource.getPaging().page-1) *this.legalcasehearingdetailnotessource.getPaging().perPage)+index);
this.legalcasehearingdetailnotessource.refresh();
break;
}
}

*/
legalcasehearingdetailnotesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalcasehearingdetailnote(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalcasehearingdetailnote(event,event.data.hearingnoteid,this.formid);
break;
case 'delete':
this.onDeletelegalcasehearingdetailnote(event,event.data.hearingnoteid,((this.legalcasehearingdetailnotessource.getPaging().page-1) *this.legalcasehearingdetailnotessource.getPaging().perPage)+event.index);
this.legalcasehearingdetailnotessource.refresh();
break;
}
}
legalcasehearingdetailnotesonDelete(obj) {
let hearingnoteid=obj.data.hearingnoteid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcasehearingservice.deletelegalcasehearing(hearingnoteid).then(res=>
this.legalcasehearingdetailnotesLoadTable()
);
}
}
legalcasehearingdetailnotesPaging(val)
{
debugger;
this.legalcasehearingdetailnotessource.setPaging(1, val, true);
}

handlelegalcasehearingdetailnotesGridSelected(event:any) {
this.legalcasehearingdetailnotesselectedindex=this.legalcasehearingservice.legalcasehearingdetailnotes.findIndex(i => i.hearingnoteid === event.data.hearingnoteid);
}
IslegalcasehearingdetailnotesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcasehearingdetailnotesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcasehearingdetailnotes

}



