import { erptenderquotationmasterService } from './../../../service/erptenderquotationmaster.service';
import { erptenderquotationmaster } from './../../../model/erptenderquotationmaster.model';
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
import { erptendermaster} from './../../../model/erptendermaster.model';
import { erptendermasterComponent } from './../../../pages/forms/erptendermaster/erptendermaster.component';
import { erptendermasterService } from './../../../service/erptendermaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
//detail table services
import { erptenderquotationanswer } from './../../../model/erptenderquotationanswer.model';
import { erptenderquotationanswerComponent } from './../../../pages/forms/erptenderquotationanswer/erptenderquotationanswer.component';
//FK services
import { erptenderquestion,IerptenderquestionResponse } from './../../../model/erptenderquestion.model';
import { erptenderquestionComponent } from './../../../pages/forms/erptenderquestion/erptenderquestion.component';
import { erptenderquestionService } from './../../../service/erptenderquestion.service';
import { erpsupplierquotationmaster,IerpsupplierquotationmasterResponse } from './../../../model/erpsupplierquotationmaster.model';
import { erpsupplierquotationmasterComponent } from './../../../pages/forms/erpsupplierquotationmaster/erpsupplierquotationmaster.component';
import { erpsupplierquotationmasterService } from './../../../service/erpsupplierquotationmaster.service';
import { erpsalesordermaster,IerpsalesordermasterResponse } from './../../../model/erpsalesordermaster.model';
import { erpsalesordermasterComponent } from './../../../pages/forms/erpsalesordermaster/erpsalesordermaster.component';
import { erpsalesordermasterService } from './../../../service/erpsalesordermaster.service';
import { erptenderquotationdetail } from './../../../model/erptenderquotationdetail.model';
import { erptenderquotationdetailComponent } from './../../../pages/forms/erptenderquotationdetail/erptenderquotationdetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { erptaxmaster,IerptaxmasterResponse } from './../../../model/erptaxmaster.model';
import { erptaxmasterComponent } from './../../../pages/forms/erptaxmaster/erptaxmaster.component';
import { erptaxmasterService } from './../../../service/erptaxmaster.service';
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
selector: 'app-erptenderquotationmaster',
templateUrl: './erptenderquotationmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erptenderquotationmasterComponent implements OnInit {
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
bfilterPopulateerptenderquotationmasters:boolean=false;
dataerptenderquotationmasterstenderid3:any=[];
dataerptenderquotationmasterssupplierid3:any=[];
dataerptenderquotationmasterspaymentterms3:any=[];
dataerptenderquotationanswersquestionid3:any=[];
dataerptenderquotationanswersquotationid3:any=[];
dataerptenderquotationanswerssoid3:any=[];
bfilterPopulateerptenderquotationanswers:boolean=false;
dataerptenderquotationdetailsitemid3:any=[];
dataerptenderquotationdetailscurrency3:any=[];
dataerptenderquotationdetailsuom3:any=[];
dataerptenderquotationdetailspaymenttermtype3:any=[];
dataerptenderquotationdetailstax2name3:any=[];
dataerptenderquotationdetailstax1name3:any=[];
dataerptenderquotationdetailsbasecurrency3:any=[];
dataerptenderquotationdetailsquotationid3:any=[];
dataerptenderquotationdetailssoid3:any=[];
bfilterPopulateerptenderquotationdetails:boolean=false;
@ViewChild('tblerptenderquotationanswerssource',{static:false}) tblerptenderquotationanswerssource: Ng2SmartTableComponent;
@ViewChild('tblerptenderquotationdetailssource',{static:false}) tblerptenderquotationdetailssource: Ng2SmartTableComponent;
 erptenderquotationmasterForm: FormGroup;
tenderidList: erptendermaster[];
tenderidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tenderid_erptendermastersForm: FormGroup;//autocomplete
tenderid_erptendermastersoptions:any;//autocomplete
tenderid_erptendermastersformatter:any;//autocomplete
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
paymenttermsList: boconfigvalue[];
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
erptenderquotationmastershowOption:boolean;
erptenderquotationanswershowOption:boolean;
erptenderquotationdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erptenderquotationanswersvisiblelist:any;
erptenderquotationanswershidelist:any;
erptenderquotationdetailsvisiblelist:any;
erptenderquotationdetailshidelist:any;

DeletederptenderquotationanswerIDs: string="";
erptenderquotationanswersID: string = "1";
erptenderquotationanswersselectedindex:any;
DeletederptenderquotationdetailIDs: string="";
erptenderquotationdetailsID: string = "2";
erptenderquotationdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erptenderquotationmasterservice: erptenderquotationmasterService,
private erptenderquestionservice: erptenderquestionService,
private erpsupplierquotationmasterservice: erpsupplierquotationmasterService,
private erpsalesordermasterservice: erpsalesordermasterService,
private erpitemmasterservice: erpitemmasterService,
private erptaxmasterservice: erptaxmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erptendermasterservice:erptendermasterService,
private erpsuppliermasterservice:erpsuppliermasterService,
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
this.erptenderquotationmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
tenderid: [null],
tenderiddesc: [null],
quotationid: [null],
supplierid: [null],
supplieriddesc: [null],
othersupplier: [null],
supplieremail: [null],
quotationreference: [null],
versionnumber: [null],
quotationdate: [null],
expirationdate: [null],
quotationamount: [null],
paymentterms: [null],
paymenttermsdesc: [null],
quotationremarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
statusremarks: [null],
});
}

get f() { return this.erptenderquotationmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erptenderquotationmasterForm.dirty && this.erptenderquotationmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.quotationid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.quotationid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.quotationid && pkDetail) {
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
let erptenderquotationmasterid = null;

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
this.formid=erptenderquotationmasterid;
//this.sharedService.alert(erptenderquotationmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterptenderquotationanswersTableConfig();
  setTimeout(() => {
  this.SeterptenderquotationanswersTableddConfig();
  });

this.SeterptenderquotationdetailsTableConfig();
  setTimeout(() => {
  this.SeterptenderquotationdetailsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erptendermasterservice.geterptendermastersList().then(res => 
{
this.tenderidList = res as erptendermaster[];
if(this.erptenderquotationmasterservice.formData && this.erptenderquotationmasterservice.formData.tenderid){
this.tenderidoptionsEvent.emit(this.tenderidList);
this.erptenderquotationmasterForm.patchValue({
    tenderid: this.erptenderquotationmasterservice.formData.tenderid,
    tenderiddesc: this.erptenderquotationmasterservice.formData.tenderiddesc,
});
}
{
let arrtenderid = this.tenderidList.filter(v => v.tenderid == this.erptenderquotationmasterForm.get('tenderid').value);
let objtenderid;
if (arrtenderid.length > 0) objtenderid = arrtenderid[0];
if (objtenderid)
{
}
}
}
).catch((err) => {console.log(err);});
this.tenderid_erptendermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tenderidList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tenderid_erptendermastersformatter = (result: any) => result.title;
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erptenderquotationmasterservice.formData && this.erptenderquotationmasterservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erptenderquotationmasterForm.patchValue({
    supplierid: this.erptenderquotationmasterservice.formData.supplierid,
    supplieriddesc: this.erptenderquotationmasterservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erptenderquotationmasterForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierid_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierid_erpsuppliermastersformatter = (result: any) => result.suppliercode;
this.configservice.getList("paymentterm").then(res => this.paymenttermsList = res as boconfigvalue[]);

//autocomplete
    this.erptenderquotationmasterservice.geterptenderquotationmastersList().then(res => {
      this.pkList = res as erptenderquotationmaster[];
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
this.erptenderquotationmasterForm.markAsUntouched();
this.erptenderquotationmasterForm.markAsPristine();
}
onSelectedtenderid(tenderidDetail: any) {
if (tenderidDetail.tenderid && tenderidDetail) {
this.erptenderquotationmasterForm.patchValue({
tenderid: tenderidDetail.tenderid,
tenderiddesc: tenderidDetail.title,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erptenderquotationmasterForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}




resetForm() {
if (this.erptenderquotationmasterForm != null)
this.erptenderquotationmasterForm.reset();
this.erptenderquotationmasterForm.patchValue({
});
setTimeout(() => {
this.erptenderquotationmasterservice.erptenderquotationanswers=[];
this.erptenderquotationanswersLoadTable();
this.erptenderquotationmasterservice.erptenderquotationdetails=[];
this.erptenderquotationdetailsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let quotationid = this.erptenderquotationmasterForm.get('quotationid').value;
        if(quotationid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erptenderquotationmasterservice.deleteerptenderquotationmaster(quotationid).then(res =>
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
    this.erptenderquotationmasterForm.patchValue({
        quotationid: null
    });
    if(this.erptenderquotationmasterservice.formData.quotationid!=null)this.erptenderquotationmasterservice.formData.quotationid=null;
for (let i=0;i<this.erptenderquotationmasterservice.erptenderquotationanswers.length;i++) {
this.erptenderquotationmasterservice.erptenderquotationanswers[i].answerid=null;
}
for (let i=0;i<this.erptenderquotationmasterservice.erptenderquotationdetails.length;i++) {
this.erptenderquotationmasterservice.erptenderquotationdetails[i].quotationdetailid=null;
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
        else if(key=="quotationdate")
this.erptenderquotationmasterForm.patchValue({"quotationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expirationdate")
this.erptenderquotationmasterForm.patchValue({"expirationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erptenderquotationmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erptenderquotationmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erptenderquotationmasterForm.controls[key]!=undefined)
{
this.erptenderquotationmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erptenderquotationmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
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
tenderidonChange(evt:any){
let e=evt.value;
}
quotationidonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
othersupplieronChange(evt:any){
let e=evt.value;
}
supplieremailonChange(evt:any){
let e=evt.value;
}
quotationreferenceonChange(evt:any){
let e=evt.value;
}
versionnumberonChange(evt:any){
let e=evt.value;
}
quotationdateonChange(evt:any){
let e=evt.value;
}
expirationdateonChange(evt:any){
let e=evt.value;
}
quotationamountonChange(evt:any){
let e=evt.value;
}
paymenttermsonChange(evt:any){
let e=this.f.paymentterms.value as any;
this.erptenderquotationmasterForm.patchValue({paymenttermsdesc:evt.options[evt.options.selectedIndex].text});
}
quotationremarksonChange(evt:any){
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
statusremarksonChange(evt:any){
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
  


editerptenderquotationmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erptenderquotationmasterservice.geterptenderquotationmastersByEID(pkcol).then(res => {

this.erptenderquotationmasterservice.formData=res.erptenderquotationmaster;
let formproperty=res.erptenderquotationmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erptenderquotationmaster.pkcol;
this.formid=res.erptenderquotationmaster.quotationid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erptenderquotationmaster.quotationid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erptenderquotationmasterForm.patchValue({
tenderid: res.erptenderquotationmaster.tenderid,
tenderiddesc: res.erptenderquotationmaster.tenderiddesc,
quotationid: res.erptenderquotationmaster.quotationid,
supplierid: res.erptenderquotationmaster.supplierid,
supplieriddesc: res.erptenderquotationmaster.supplieriddesc,
othersupplier: res.erptenderquotationmaster.othersupplier,
supplieremail: res.erptenderquotationmaster.supplieremail,
quotationreference: res.erptenderquotationmaster.quotationreference,
versionnumber: res.erptenderquotationmaster.versionnumber,
quotationdate: this.ngbDateParserFormatter.parse(res.erptenderquotationmaster.quotationdate),
expirationdate: this.ngbDateParserFormatter.parse(res.erptenderquotationmaster.expirationdate),
quotationamount: res.erptenderquotationmaster.quotationamount,
paymentterms: res.erptenderquotationmaster.paymentterms,
paymenttermsdesc: res.erptenderquotationmaster.paymenttermsdesc,
quotationremarks: res.erptenderquotationmaster.quotationremarks,
customfield: res.erptenderquotationmaster.customfield,
attachment: JSON.parse(res.erptenderquotationmaster.attachment),
status: res.erptenderquotationmaster.status,
statusdesc: res.erptenderquotationmaster.statusdesc,
statusremarks: res.erptenderquotationmaster.statusremarks,
});
this.erptenderquotationanswersvisiblelist=res.erptenderquotationanswersvisiblelist;
this.erptenderquotationdetailsvisiblelist=res.erptenderquotationdetailsvisiblelist;
if(this.erptenderquotationmasterForm.get('customfield').value!=null && this.erptenderquotationmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erptenderquotationmasterForm.get('customfield').value);
this.FillCustomField();
if(this.erptenderquotationmasterForm.get('attachment').value!=null && this.erptenderquotationmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erptenderquotationmasterForm.get('attachment').value);
//Child Tables if any
this.erptenderquotationmasterservice.erptenderquotationanswers = res.erptenderquotationanswers;
this.SeterptenderquotationanswersTableConfig();
this.erptenderquotationanswersLoadTable();
  setTimeout(() => {
  this.SeterptenderquotationanswersTableddConfig();
  });
this.erptenderquotationmasterservice.erptenderquotationdetails = res.erptenderquotationdetails;
this.SeterptenderquotationdetailsTableConfig();
this.erptenderquotationdetailsLoadTable();
  setTimeout(() => {
  this.SeterptenderquotationdetailsTableddConfig();
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
  for (let key in this.erptenderquotationmasterForm.controls) {
    if (this.erptenderquotationmasterForm.controls[key] != null) {
if(false)
{
if(this.erptenderquotationmasterservice.formData!=null && this.erptenderquotationmasterservice.formData[key]!=null  && this.erptenderquotationmasterservice.formData[key]!='[]' && this.erptenderquotationmasterservice.formData[key]!=undefined && this.erptenderquotationmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erptenderquotationmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erptenderquotationmasterservice.formData!=null && this.erptenderquotationmasterservice.formData[key]!=null   && this.erptenderquotationmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erptenderquotationmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erptenderquotationmasterservice.formData!=null && this.erptenderquotationmasterservice.formData[key]!=null   && this.erptenderquotationmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erptenderquotationmasterservice.formData[key]+"'><div class='progress__number'>"+this.erptenderquotationmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptenderquotationmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erptenderquotationmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erptenderquotationmasterForm.value;
obj.quotationdate=new Date(this.erptenderquotationmasterForm.get('quotationdate').value ? this.ngbDateParserFormatter.format(this.erptenderquotationmasterForm.get('quotationdate').value)+'  UTC' :null);
obj.expirationdate=new Date(this.erptenderquotationmasterForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.erptenderquotationmasterForm.get('expirationdate').value)+'  UTC' :null);
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

private erptenderquotationmastertoggleOption(){
this.erptenderquotationmastershowOption = this.erptenderquotationmastershowOption === true ? false : true;
}

private erptenderquotationanswertoggleOption(){
this.erptenderquotationanswershowOption = this.erptenderquotationanswershowOption === true ? false : true;
}

private erptenderquotationdetailtoggleOption(){
this.erptenderquotationdetailshowOption = this.erptenderquotationdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erptenderquotationmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erptenderquotationmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erptenderquotationmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erptenderquotationmasterservice.formData=this.erptenderquotationmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erptenderquotationmasterForm.controls[key] != null)
    {
        this.erptenderquotationmasterservice.formData[key] = this.erptenderquotationmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erptenderquotationmasterservice.formData.quotationdate=new Date(this.erptenderquotationmasterForm.get('quotationdate').value ? this.ngbDateParserFormatter.format(this.erptenderquotationmasterForm.get('quotationdate').value)+'  UTC' :null);
this.erptenderquotationmasterservice.formData.expirationdate=new Date(this.erptenderquotationmasterForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.erptenderquotationmasterForm.get('expirationdate').value)+'  UTC' :null);
if(customfields!=null)this.erptenderquotationmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erptenderquotationmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erptenderquotationmasterservice.formData.DeletederptenderquotationanswerIDs = this.DeletederptenderquotationanswerIDs;
this.erptenderquotationmasterservice.formData.DeletederptenderquotationdetailIDs = this.DeletederptenderquotationdetailIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erptenderquotationmasterservice.formData);
this.erptenderquotationmasterservice.formData=this.erptenderquotationmasterForm.value;
this.erptenderquotationmasterservice.saveOrUpdateerptenderquotationmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erptenderquotationanswerssource.data)
{
    for (let i = 0; i < this.erptenderquotationanswerssource.data.length; i++)
    {
        if (this.erptenderquotationanswerssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptenderquotationanswerssource.data[i].fileattachmentlist);
    }
}
if (this.erptenderquotationdetailssource.data)
{
    for (let i = 0; i < this.erptenderquotationdetailssource.data.length; i++)
    {
        if (this.erptenderquotationdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erptenderquotationdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptenderquotationmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erptenderquotationmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptenderquotationmaster);
}
else
{
this.FillData(res);
}
}
this.erptenderquotationmasterForm.markAsUntouched();
this.erptenderquotationmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdittenderid( tenderid) {
/*let ScreenType='2';
this.dialog.open(erptendermasterComponent, 
{
data: {tenderid:this.erptenderquotationmasterForm.get('tenderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erptenderquotationmasterForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerptenderquotationanswer(event:any,answerid:any, quotationid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erptenderquotationanswerComponent, 
{
data:  {  showview:false,save:false,event,answerid, quotationid,visiblelist:this.erptenderquotationanswersvisiblelist,  hidelist:this.erptenderquotationanswershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erptenderquotationanswerssource.add(res);
this.erptenderquotationanswerssource.refresh();
}
else
{
this.erptenderquotationanswerssource.update(event.data, res);
}
}
});
}

onDeleteerptenderquotationanswer(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederptenderquotationanswerIDs += childID + ",";
this.erptenderquotationmasterservice.erptenderquotationanswers.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditerptenderquotationdetail(event:any,quotationdetailid:any, quotationid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erptenderquotationdetailComponent, 
{
data:  {  showview:false,save:false,event,quotationdetailid, quotationid,visiblelist:this.erptenderquotationdetailsvisiblelist,  hidelist:this.erptenderquotationdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erptenderquotationdetailssource.add(res);
this.erptenderquotationdetailssource.refresh();
}
else
{
this.erptenderquotationdetailssource.update(event.data, res);
}
}
});
}

onDeleteerptenderquotationdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederptenderquotationdetailIDs += childID + ",";
this.erptenderquotationmasterservice.erptenderquotationdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erptenderquotationanswers
erptenderquotationanswerssettings:any;
erptenderquotationanswerssource: any;

showerptenderquotationanswersCheckbox()
{
debugger;
if(this.tblerptenderquotationanswerssource.settings['selectMode']== 'multi')this.tblerptenderquotationanswerssource.settings['selectMode']= 'single';
else
this.tblerptenderquotationanswerssource.settings['selectMode']= 'multi';
this.tblerptenderquotationanswerssource.initGrid();
}
deleteerptenderquotationanswersAll()
{
this.tblerptenderquotationanswerssource.settings['selectMode'] = 'single';
}
showerptenderquotationanswersFilter()
{
  setTimeout(() => {
  this.SeterptenderquotationanswersTableddConfig();
  });
      if(this.tblerptenderquotationanswerssource.settings!=null)this.tblerptenderquotationanswerssource.settings['hideSubHeader'] =!this.tblerptenderquotationanswerssource.settings['hideSubHeader'];
this.tblerptenderquotationanswerssource.initGrid();
}
showerptenderquotationanswersInActive()
{
}
enableerptenderquotationanswersInActive()
{
}
async SeterptenderquotationanswersTableddConfig()
{
if(!this.bfilterPopulateerptenderquotationanswers){
}
this.bfilterPopulateerptenderquotationanswers=true;
}
async erptenderquotationanswersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptenderquotationanswersTableConfig()
{
this.erptenderquotationanswerssettings = {
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
tenderid: {
title: 'Tender',
type: 'number',
filter:true,
},
questionid: {
title: 'Question',
type: 'number',
filter:true,
},
question: {
title: 'Question',
type: '',
filter:true,
},
answer: {
title: 'Answer',
type: '',
filter:true,
},
},
};
}
erptenderquotationanswersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderquotationanswersID)>=0)
{
this.erptenderquotationanswerssource=new LocalDataSource();
this.erptenderquotationanswerssource.load(this.erptenderquotationmasterservice.erptenderquotationanswers as  any as LocalDataSource);
this.erptenderquotationanswerssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erptenderquotationanswersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptenderquotationmasterservice.erptenderquotationanswers.length == 0)
{
    this.tblerptenderquotationanswerssource.grid.createFormShown = true;
}
else
{
    let obj = new erptenderquotationanswer();
    this.erptenderquotationmasterservice.erptenderquotationanswers.push(obj);
    this.erptenderquotationanswerssource.refresh();
    if ((this.erptenderquotationmasterservice.erptenderquotationanswers.length / this.erptenderquotationanswerssource.getPaging().perPage).toFixed(0) + 1 != this.erptenderquotationanswerssource.getPaging().page)
    {
        this.erptenderquotationanswerssource.setPage((this.erptenderquotationmasterservice.erptenderquotationanswers.length / this.erptenderquotationanswerssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptenderquotationanswerssource.grid.edit(this.tblerptenderquotationanswerssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptenderquotationanswerssource.data.indexOf(event.data);
this.onDeleteerptenderquotationanswer(event,event.data.answerid,((this.erptenderquotationanswerssource.getPaging().page-1) *this.erptenderquotationanswerssource.getPaging().perPage)+index);
this.erptenderquotationanswerssource.refresh();
break;
}
}

*/
erptenderquotationanswersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerptenderquotationanswer(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerptenderquotationanswer(event,event.data.answerid,this.formid);
break;
case 'delete':
this.onDeleteerptenderquotationanswer(event,event.data.answerid,((this.erptenderquotationanswerssource.getPaging().page-1) *this.erptenderquotationanswerssource.getPaging().perPage)+event.index);
this.erptenderquotationanswerssource.refresh();
break;
}
}
erptenderquotationanswersonDelete(obj) {
let answerid=obj.data.answerid;
if (confirm('Are you sure to delete this record ?')) {
this.erptenderquotationmasterservice.deleteerptenderquotationmaster(answerid).then(res=>
this.erptenderquotationanswersLoadTable()
);
}
}
erptenderquotationanswersPaging(val)
{
debugger;
this.erptenderquotationanswerssource.setPaging(1, val, true);
}

handleerptenderquotationanswersGridSelected(event:any) {
this.erptenderquotationanswersselectedindex=this.erptenderquotationmasterservice.erptenderquotationanswers.findIndex(i => i.answerid === event.data.answerid);
}
IserptenderquotationanswersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderquotationanswersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptenderquotationanswers
//start of Grid Codes erptenderquotationdetails
erptenderquotationdetailssettings:any;
erptenderquotationdetailssource: any;

showerptenderquotationdetailsCheckbox()
{
debugger;
if(this.tblerptenderquotationdetailssource.settings['selectMode']== 'multi')this.tblerptenderquotationdetailssource.settings['selectMode']= 'single';
else
this.tblerptenderquotationdetailssource.settings['selectMode']= 'multi';
this.tblerptenderquotationdetailssource.initGrid();
}
deleteerptenderquotationdetailsAll()
{
this.tblerptenderquotationdetailssource.settings['selectMode'] = 'single';
}
showerptenderquotationdetailsFilter()
{
  setTimeout(() => {
  this.SeterptenderquotationdetailsTableddConfig();
  });
      if(this.tblerptenderquotationdetailssource.settings!=null)this.tblerptenderquotationdetailssource.settings['hideSubHeader'] =!this.tblerptenderquotationdetailssource.settings['hideSubHeader'];
this.tblerptenderquotationdetailssource.initGrid();
}
showerptenderquotationdetailsInActive()
{
}
enableerptenderquotationdetailsInActive()
{
}
async SeterptenderquotationdetailsTableddConfig()
{
if(!this.bfilterPopulateerptenderquotationdetails){
}
this.bfilterPopulateerptenderquotationdetails=true;
}
async erptenderquotationdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterptenderquotationdetailsTableConfig()
{
this.erptenderquotationdetailssettings = {
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
tenderid: {
title: 'Tender',
type: 'number',
filter:true,
},
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
itemdescription: {
title: 'Item Description',
type: '',
filter:true,
},
supplierproductcode: {
title: 'Supplier Product Code',
type: '',
filter:true,
},
supplierproductname: {
title: 'Supplier Product Name',
type: '',
filter:true,
},
supplierproductdescription: {
title: 'Supplier Product Description',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
supplierproductbrand: {
title: 'Supplier Product Brand',
type: '',
filter:true,
},
supplierproducturl: {
title: 'Supplier Product U R L',
type: '',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
currency: {
title: 'Currency',
type: '',
filter:true,
},
unitprice: {
title: 'Unit Price',
type: '',
filter:true,
},
tax1name: {
title: 'Tax1 Name',
type: 'number',
filter:true,
},
tax1value: {
title: 'Tax1 Value',
type: '',
filter:true,
},
tax2name: {
title: 'Tax2 Name',
type: 'number',
filter:true,
},
tax2value: {
title: 'Tax2 Value',
type: '',
filter:true,
},
othercharges: {
title: 'Other Charges',
type: '',
filter:true,
},
totalquotevalue: {
title: 'Total Quote Value',
type: '',
filter:true,
},
basecurrency: {
title: 'Base Currency',
type: 'number',
filter:true,
},
basevalue: {
title: 'Base Value',
type: '',
filter:true,
},
expecteddelivery: {
title: 'Expected Delivery',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
paymenttermtype: {
title: 'Payment Term Type',
type: '',
filter:true,
},
offerquantity1: {
title: 'Offer Quantity1',
type: 'number',
filter:true,
},
unitprice1: {
title: 'Unit Price1',
type: 'number',
filter:true,
},
totalcost1: {
title: 'Total Cost1',
type: 'number',
filter:true,
},
offerquantity2: {
title: 'Offer Quantity2',
type: 'number',
filter:true,
},
unitprice2: {
title: 'Unit Price2',
type: 'number',
filter:true,
},
totalcost2: {
title: 'Total Cost2',
type: 'number',
filter:true,
},
offerquantity3: {
title: 'Offer Quantity3',
type: 'number',
filter:true,
},
unitprice3: {
title: 'Unit Price3',
type: 'number',
filter:true,
},
totalcost3: {
title: 'Total Cost3',
type: 'number',
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
discountpercent: {
title: 'Discount Percent',
type: '',
filter:true,
},
},
};
}
erptenderquotationdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderquotationdetailsID)>=0)
{
this.erptenderquotationdetailssource=new LocalDataSource();
this.erptenderquotationdetailssource.load(this.erptenderquotationmasterservice.erptenderquotationdetails as  any as LocalDataSource);
this.erptenderquotationdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erptenderquotationdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erptenderquotationmasterservice.erptenderquotationdetails.length == 0)
{
    this.tblerptenderquotationdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erptenderquotationdetail();
    this.erptenderquotationmasterservice.erptenderquotationdetails.push(obj);
    this.erptenderquotationdetailssource.refresh();
    if ((this.erptenderquotationmasterservice.erptenderquotationdetails.length / this.erptenderquotationdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erptenderquotationdetailssource.getPaging().page)
    {
        this.erptenderquotationdetailssource.setPage((this.erptenderquotationmasterservice.erptenderquotationdetails.length / this.erptenderquotationdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerptenderquotationdetailssource.grid.edit(this.tblerptenderquotationdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erptenderquotationdetailssource.data.indexOf(event.data);
this.onDeleteerptenderquotationdetail(event,event.data.quotationdetailid,((this.erptenderquotationdetailssource.getPaging().page-1) *this.erptenderquotationdetailssource.getPaging().perPage)+index);
this.erptenderquotationdetailssource.refresh();
break;
}
}

*/
erptenderquotationdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerptenderquotationdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerptenderquotationdetail(event,event.data.quotationdetailid,this.formid);
break;
case 'delete':
this.onDeleteerptenderquotationdetail(event,event.data.quotationdetailid,((this.erptenderquotationdetailssource.getPaging().page-1) *this.erptenderquotationdetailssource.getPaging().perPage)+event.index);
this.erptenderquotationdetailssource.refresh();
break;
}
}
erptenderquotationdetailsonDelete(obj) {
let quotationdetailid=obj.data.quotationdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erptenderquotationmasterservice.deleteerptenderquotationmaster(quotationdetailid).then(res=>
this.erptenderquotationdetailsLoadTable()
);
}
}
erptenderquotationdetailsPaging(val)
{
debugger;
this.erptenderquotationdetailssource.setPaging(1, val, true);
}

handleerptenderquotationdetailsGridSelected(event:any) {
this.erptenderquotationdetailsselectedindex=this.erptenderquotationmasterservice.erptenderquotationdetails.findIndex(i => i.quotationdetailid === event.data.quotationdetailid);
}
IserptenderquotationdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erptenderquotationdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erptenderquotationdetails

}



