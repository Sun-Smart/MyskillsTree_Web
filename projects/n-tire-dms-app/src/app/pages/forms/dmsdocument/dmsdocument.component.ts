import { dmsdocumentService } from './../../../service/dmsdocument.service';
import { dmsdocument } from './../../../model/dmsdocument.model';
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
import { dmsfolder} from './../../../model/dmsfolder.model';
import { dmsfolderComponent } from './../../../pages/forms/dmsfolder/dmsfolder.component';
import { dmsfolderService } from './../../../service/dmsfolder.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { bodocumentcontrol } from '../../../../../../n-tire-bo-app/src/app/model/bodocumentcontrol.model';
import { bodocumentcontrolComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bodocumentcontrol/bodocumentcontrol.component';
//FK services
import { dmssubscription } from './../../../model/dmssubscription.model';
import { dmssubscriptionComponent } from './../../../pages/forms/dmssubscription/dmssubscription.component';
//FK services
import { dmsarchiverestorerequest } from './../../../model/dmsarchiverestorerequest.model';
import { dmsarchiverestorerequestComponent } from './../../../pages/forms/dmsarchiverestorerequest/dmsarchiverestorerequest.component';
//FK services
import { dmsaudittrail } from './../../../model/dmsaudittrail.model';
import { dmsaudittrailComponent } from './../../../pages/forms/dmsaudittrail/dmsaudittrail.component';
//FK services
import { dmsdocumentfield } from './../../../model/dmsdocumentfield.model';
import { dmsdocumentfieldComponent } from './../../../pages/forms/dmsdocumentfield/dmsdocumentfield.component';
//FK services
import { dmslinkeddocument } from './../../../model/dmslinkeddocument.model';
import { dmslinkeddocumentComponent } from './../../../pages/forms/dmslinkeddocument/dmslinkeddocument.component';
//FK services
import { dmslink } from './../../../model/dmslink.model';
import { dmslinkComponent } from './../../../pages/forms/dmslink/dmslink.component';
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
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-dmsdocument',
templateUrl: './dmsdocument.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class dmsdocumentComponent implements OnInit {
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
CustomFormField:string="folderid";
CustomFormFieldValue:string="";
pmenuid:any;
pcurrenturl:any;
isSubmitted:boolean=false;
ShowTableslist:string[]=[];
data:any;
maindata:any;
data3:any=[];
bfilterPopulatedmsdocuments:boolean=false;
datadmsdocumentsfolderid3:any=[];
datadmsdocumentsdepartmentid3:any=[];
datadmsdocumentstype3:any=[];
datadmsdocumentssource3:any=[];
datadmsdocumentsfiletype3:any=[];
datadmsdocumentscheckoutby3:any=[];
datadmsdocumentsdocumentstatus3:any=[];
databodocumentcontrolsuserid3:any=[];
databodocumentcontrolsdocumentid3:any=[];
databodocumentcontrolsaction3:any=[];
bfilterPopulatebodocumentcontrols:boolean=false;
datadmssubscriptionssubscriptionstatus3:any=[];
datadmssubscriptionsuserid3:any=[];
datadmssubscriptionsdocumentid3:any=[];
bfilterPopulatedmssubscriptions:boolean=false;
datadmsarchiverestorerequestsdocumentid3:any=[];
datadmsarchiverestorerequestsadminuserid3:any=[];
bfilterPopulatedmsarchiverestorerequests:boolean=false;
datadmsaudittrailsaction3:any=[];
datadmsaudittrailsuserid3:any=[];
datadmsaudittrailsdocumentid3:any=[];
bfilterPopulatedmsaudittrails:boolean=false;
datadmsdocumentfieldsdocumentid3:any=[];
bfilterPopulatedmsdocumentfields:boolean=false;
datadmslinkeddocumentslinkeddocumentid3:any=[];
datadmslinkeddocumentslinktype3:any=[];
datadmslinkeddocumentsdocumentid3:any=[];
bfilterPopulatedmslinkeddocuments:boolean=false;
datadmslinkslinktype3:any=[];
datadmslinksdocumentid3:any=[];
bfilterPopulatedmslinks:boolean=false;
@ViewChild('tblbodocumentcontrolssource',{static:false}) tblbodocumentcontrolssource: Ng2SmartTableComponent;
@ViewChild('tbldmssubscriptionssource',{static:false}) tbldmssubscriptionssource: Ng2SmartTableComponent;
@ViewChild('tbldmsarchiverestorerequestssource',{static:false}) tbldmsarchiverestorerequestssource: Ng2SmartTableComponent;
@ViewChild('tbldmsaudittrailssource',{static:false}) tbldmsaudittrailssource: Ng2SmartTableComponent;
@ViewChild('tbldmsdocumentfieldssource',{static:false}) tbldmsdocumentfieldssource: Ng2SmartTableComponent;
@ViewChild('tbldmslinkeddocumentssource',{static:false}) tbldmslinkeddocumentssource: Ng2SmartTableComponent;
@ViewChild('tbldmslinkssource',{static:false}) tbldmslinkssource: Ng2SmartTableComponent;
 dmsdocumentForm: FormGroup;
folderidList: dmsfolder[];
departmentidList: bomasterdata[];
typeList: boconfigvalue[];
sourceList: boconfigvalue[];
filetypeList: boconfigvalue[];
checkoutbyList: bousermaster[];
documentstatusList: boconfigvalue[];
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
@ViewChild('documentimage',{static:false}) documentimage: AttachmentComponent;
@ViewChild('thumbnail',{static:false}) thumbnail: AttachmentComponent;
SESSIONUSERID:any;//current user
dmsdocumentshowOption:boolean;
bodocumentcontrolshowOption:boolean;
dmssubscriptionshowOption:boolean;
dmsarchiverestorerequestshowOption:boolean;
dmsaudittrailshowOption:boolean;
dmsdocumentfieldshowOption:boolean;
dmslinkeddocumentshowOption:boolean;
dmslinkshowOption:boolean;
sessiondata:any;
sourcekey:any;



bodocumentcontrolsvisiblelist:any;
bodocumentcontrolshidelist:any;
dmssubscriptionsvisiblelist:any;
dmssubscriptionshidelist:any;
dmsarchiverestorerequestsvisiblelist:any;
dmsarchiverestorerequestshidelist:any;
dmsaudittrailsvisiblelist:any;
dmsaudittrailshidelist:any;
dmsdocumentfieldsvisiblelist:any;
dmsdocumentfieldshidelist:any;
dmslinkeddocumentsvisiblelist:any;
dmslinkeddocumentshidelist:any;
dmslinksvisiblelist:any;
dmslinkshidelist:any;

DeletedbodocumentcontrolIDs: string="";
bodocumentcontrolsID: string = "1";
bodocumentcontrolsselectedindex:any;
DeleteddmssubscriptionIDs: string="";
dmssubscriptionsID: string = "2";
dmssubscriptionsselectedindex:any;
DeleteddmsarchiverestorerequestIDs: string="";
dmsarchiverestorerequestsID: string = "3";
dmsarchiverestorerequestsselectedindex:any;
DeleteddmsaudittrailIDs: string="";
dmsaudittrailsID: string = "4";
dmsaudittrailsselectedindex:any;
DeleteddmsdocumentfieldIDs: string="";
dmsdocumentfieldsID: string = "5";
dmsdocumentfieldsselectedindex:any;
DeleteddmslinkeddocumentIDs: string="";
dmslinkeddocumentsID: string = "6";
dmslinkeddocumentsselectedindex:any;
DeleteddmslinkIDs: string="";
dmslinksID: string = "7";
dmslinksselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private dmsdocumentservice: dmsdocumentService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private dmsfolderservice:dmsfolderService,
private bomasterdataservice:bomasterdataService,
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
this.dmsdocumentForm  = this.fb.group({
pk:[null],
ImageName: [null],
documentid: [null],
reference: [null],
name: [null, Validators.required],
folderid: [null, Validators.required],
folderiddesc: [null],
sourcefield: [null],
sourcereference: [null],
versionnumber: [null],
versiondate: [null],
departmentid: [null],
departmentiddesc: [null],
type: [null],
typedesc: [null],
source: [null],
sourcedesc: [null],
documentimage: [null],
thumbnail: [null],
details: [null],
origin: [null],
receiptdate: [null],
documentlink: [null],
size: [null],
filetype: [null],
filetypedesc: [null],
render: [null],
metatag: [null],
checkedout: [null],
checkoutby: [null],
checkoutbydesc: [null],
checkoutdatetime: [null],
documentstatus: [null],
documentstatusdesc: [null],
expirationdate: [null],
rank: [null],
fullpath: [null],
remarks: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.dmsdocumentForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.dmsdocumentForm.dirty && this.dmsdocumentForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.documentid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.documentid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.documentid && pkDetail) {
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
let dmsdocumentid = null;

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
this.formid=dmsdocumentid;
//this.sharedService.alert(dmsdocumentid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbodocumentcontrolsTableConfig();
  setTimeout(() => {
  this.SetbodocumentcontrolsTableddConfig();
  });

this.SetdmssubscriptionsTableConfig();
  setTimeout(() => {
  this.SetdmssubscriptionsTableddConfig();
  });

this.SetdmsarchiverestorerequestsTableConfig();
  setTimeout(() => {
  this.SetdmsarchiverestorerequestsTableddConfig();
  });

this.SetdmsaudittrailsTableConfig();
  setTimeout(() => {
  this.SetdmsaudittrailsTableddConfig();
  });

this.SetdmsdocumentfieldsTableConfig();
  setTimeout(() => {
  this.SetdmsdocumentfieldsTableddConfig();
  });

this.SetdmslinkeddocumentsTableConfig();
  setTimeout(() => {
  this.SetdmslinkeddocumentsTableddConfig();
  });

this.SetdmslinksTableConfig();
  setTimeout(() => {
  this.SetdmslinksTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.dmsfolderservice.getdmsfoldersList().then(res => 
{
this.folderidList = res as dmsfolder[];
}
).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("type").then(res => this.typeList = res as boconfigvalue[]);
this.configservice.getList("source").then(res => this.sourceList = res as boconfigvalue[]);
this.configservice.getList("filetype").then(res => this.filetypeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.checkoutbyList = res as bousermaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("documentstatus").then(res => this.documentstatusList = res as boconfigvalue[]);

//autocomplete
    this.dmsdocumentservice.getdmsdocumentsList().then(res => {
      this.pkList = res as dmsdocument[];
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
this.dmsdocumentForm.markAsUntouched();
this.dmsdocumentForm.markAsPristine();
}



  getdocumentimage() {
    debugger;
    if (this.documentimage.getattachmentlist().length > 0) {
      let file = this.documentimage.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
  getthumbnail() {
    debugger;
    if (this.thumbnail.getattachmentlist().length > 0) {
      let file = this.thumbnail.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.dmsdocumentForm != null)
this.dmsdocumentForm.reset();
this.dmsdocumentForm.patchValue({
checkoutby: this.sessiondata.userid,
checkoutbydesc: this.sessiondata.username,
});
setTimeout(() => {
this.dmsdocumentservice.bodocumentcontrols=[];
this.bodocumentcontrolsLoadTable();
this.dmsdocumentservice.dmssubscriptions=[];
this.dmssubscriptionsLoadTable();
this.dmsdocumentservice.dmsarchiverestorerequests=[];
this.dmsarchiverestorerequestsLoadTable();
this.dmsdocumentservice.dmsaudittrails=[];
this.dmsaudittrailsLoadTable();
this.dmsdocumentservice.dmsdocumentfields=[];
this.dmsdocumentfieldsLoadTable();
this.dmsdocumentservice.dmslinkeddocuments=[];
this.dmslinkeddocumentsLoadTable();
this.dmsdocumentservice.dmslinks=[];
this.dmslinksLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.dmsdocumentForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let documentid = this.dmsdocumentForm.get('documentid').value;
        if(documentid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.dmsdocumentservice.deletedmsdocument(documentid).then(res =>
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
    this.dmsdocumentForm.patchValue({
        documentid: null
    });
    if(this.dmsdocumentservice.formData.documentid!=null)this.dmsdocumentservice.formData.documentid=null;
for (let i=0;i<this.dmsdocumentservice.bodocumentcontrols.length;i++) {
this.dmsdocumentservice.bodocumentcontrols[i].controlid=null;
}
for (let i=0;i<this.dmsdocumentservice.dmssubscriptions.length;i++) {
this.dmsdocumentservice.dmssubscriptions[i].subscriptionid=null;
}
for (let i=0;i<this.dmsdocumentservice.dmsarchiverestorerequests.length;i++) {
this.dmsdocumentservice.dmsarchiverestorerequests[i].requestid=null;
}
for (let i=0;i<this.dmsdocumentservice.dmsaudittrails.length;i++) {
this.dmsdocumentservice.dmsaudittrails[i].audittrailid=null;
}
for (let i=0;i<this.dmsdocumentservice.dmsdocumentfields.length;i++) {
this.dmsdocumentservice.dmsdocumentfields[i].propertyid=null;
}
for (let i=0;i<this.dmsdocumentservice.dmslinkeddocuments.length;i++) {
this.dmsdocumentservice.dmslinkeddocuments[i].linkedid=null;
}
for (let i=0;i<this.dmsdocumentservice.dmslinks.length;i++) {
this.dmsdocumentservice.dmslinks[i].linkid=null;
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
        else if(key=="versiondate")
this.dmsdocumentForm.patchValue({"versiondate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="receiptdate")
this.dmsdocumentForm.patchValue({"receiptdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="metatag")
this.dmsdocumentForm.patchValue({"metatag":  mainscreendata[key] } );
        else if(key=="checkoutdatetime")
this.dmsdocumentForm.patchValue({"checkoutdatetime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expirationdate")
this.dmsdocumentForm.patchValue({"expirationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="remarks")
this.dmsdocumentForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.dmsdocumentForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.dmsdocumentForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.dmsdocumentForm.controls[key]!=undefined)
{
this.dmsdocumentForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservicelist=await this.customfieldservice.getcustomfieldconfigurationsByTable("dmsdocuments",this.CustomFormName,this.CustomFormField,this.dmsdocumentForm.get(this.CustomFormField).value,this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


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
documentidonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
nameonChange(evt:any){
let e=evt.value;
}
folderidonChange(evt:any){
let e=evt.value;
this.FillCustomField();
this.dmsdocumentForm.patchValue({folderiddesc:evt.options[evt.options.selectedIndex].text});
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
versionnumberonChange(evt:any){
let e=evt.value;
}
versiondateonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
this.dmsdocumentForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
typeonChange(evt:any){
let e=this.f.type.value as any;
this.dmsdocumentForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
sourceonChange(evt:any){
let e=this.f.source.value as any;
this.dmsdocumentForm.patchValue({sourcedesc:evt.options[evt.options.selectedIndex].text});
}
documentimageonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
let e=evt.value;
}
originonChange(evt:any){
let e=evt.value;
}
receiptdateonChange(evt:any){
let e=evt.value;
}
documentlinkonChange(evt:any){
let e=evt.value;
}
sizeonChange(evt:any){
let e=evt.value;
}
filetypeonChange(evt:any){
let e=this.f.filetype.value as any;
this.dmsdocumentForm.patchValue({filetypedesc:evt.options[evt.options.selectedIndex].text});
}
renderonChange(evt:any){
let e=evt.value;
}
metatagonChange(evt:any){
let e=evt.value;
}
checkedoutonChange(evt:any){
let e=evt.value;
}
checkoutbyonChange(evt:any){
let e=evt.value;
this.dmsdocumentForm.patchValue({checkoutbydesc:evt.options[evt.options.selectedIndex].text});
}
checkoutdatetimeonChange(evt:any){
let e=evt.value;
}
documentstatusonChange(evt:any){
let e=this.f.documentstatus.value as any;
this.dmsdocumentForm.patchValue({documentstatusdesc:evt.options[evt.options.selectedIndex].text});
}
expirationdateonChange(evt:any){
let e=evt.value;
}
rankonChange(evt:any){
let e=evt.value;
}
fullpathonChange(evt:any){
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
  


editdmsdocuments() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.dmsdocumentservice.getdmsdocumentsByEID(pkcol).then(res => {

this.dmsdocumentservice.formData=res.dmsdocument;
let formproperty=res.dmsdocument.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.dmsdocument.pkcol;
this.formid=res.dmsdocument.documentid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.dmsdocumentservice.formData=res.dmsdocument;
this.formid=res.dmsdocument.documentid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.dmsdocumentForm.patchValue({
documentid: res.dmsdocument.documentid,
reference: res.dmsdocument.reference,
name: res.dmsdocument.name,
folderid: res.dmsdocument.folderid,
folderiddesc: res.dmsdocument.folderiddesc,
sourcefield: res.dmsdocument.sourcefield,
sourcereference: res.dmsdocument.sourcereference,
versionnumber: res.dmsdocument.versionnumber,
versiondate: this.ngbDateParserFormatter.parse(res.dmsdocument.versiondate),
departmentid: res.dmsdocument.departmentid,
departmentiddesc: res.dmsdocument.departmentiddesc,
type: res.dmsdocument.type,
typedesc: res.dmsdocument.typedesc,
source: res.dmsdocument.source,
sourcedesc: res.dmsdocument.sourcedesc,
documentimage: JSON.parse(res.dmsdocument.documentimage),
thumbnail: JSON.parse(res.dmsdocument.thumbnail),
details: res.dmsdocument.details,
origin: res.dmsdocument.origin,
receiptdate: this.ngbDateParserFormatter.parse(res.dmsdocument.receiptdate),
documentlink: res.dmsdocument.documentlink,
size: res.dmsdocument.size,
filetype: res.dmsdocument.filetype,
filetypedesc: res.dmsdocument.filetypedesc,
render: res.dmsdocument.render,
metatag: JSON.parse(res.dmsdocument.metatag),
checkedout: res.dmsdocument.checkedout,
checkoutby: res.dmsdocument.checkoutby,
checkoutbydesc: res.dmsdocument.checkoutbydesc,
checkoutdatetime: this.ngbDateParserFormatter.parse(res.dmsdocument.checkoutdatetime),
documentstatus: res.dmsdocument.documentstatus,
documentstatusdesc: res.dmsdocument.documentstatusdesc,
expirationdate: this.ngbDateParserFormatter.parse(res.dmsdocument.expirationdate),
rank: res.dmsdocument.rank,
fullpath: res.dmsdocument.fullpath,
remarks: JSON.parse(res.dmsdocument.remarks),
customfield: res.dmsdocument.customfield,
attachment: JSON.parse(res.dmsdocument.attachment),
status: res.dmsdocument.status,
statusdesc: res.dmsdocument.statusdesc,
});
this.bodocumentcontrolsvisiblelist=res.bodocumentcontrolsvisiblelist;
this.dmssubscriptionsvisiblelist=res.dmssubscriptionsvisiblelist;
this.dmsarchiverestorerequestsvisiblelist=res.dmsarchiverestorerequestsvisiblelist;
this.dmsaudittrailsvisiblelist=res.dmsaudittrailsvisiblelist;
this.dmsdocumentfieldsvisiblelist=res.dmsdocumentfieldsvisiblelist;
this.dmslinkeddocumentsvisiblelist=res.dmslinkeddocumentsvisiblelist;
this.dmslinksvisiblelist=res.dmslinksvisiblelist;
if(this.dmsdocumentForm.get('customfield').value!=null && this.dmsdocumentForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.dmsdocumentForm.get('customfield').value);
this.FillCustomField();
if(this.dmsdocumentForm.get('documentimage').value!=null && this.dmsdocumentForm.get('documentimage').value!="" && this.documentimage!=null && this.documentimage!=undefined)this.documentimage.setattachmentlist(this.dmsdocumentForm.get('documentimage').value);
if(this.dmsdocumentForm.get('thumbnail').value!=null && this.dmsdocumentForm.get('thumbnail').value!="" && this.thumbnail!=null && this.thumbnail!=undefined)this.thumbnail.setattachmentlist(this.dmsdocumentForm.get('thumbnail').value);
if(this.dmsdocumentForm.get('attachment').value!=null && this.dmsdocumentForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.dmsdocumentForm.get('attachment').value);
//Child Tables if any
this.dmsdocumentservice.bodocumentcontrols = res.bodocumentcontrols;
this.SetbodocumentcontrolsTableConfig();
this.bodocumentcontrolsLoadTable();
  setTimeout(() => {
  this.SetbodocumentcontrolsTableddConfig();
  });
this.dmsdocumentservice.dmssubscriptions = res.dmssubscriptions;
this.SetdmssubscriptionsTableConfig();
this.dmssubscriptionsLoadTable();
  setTimeout(() => {
  this.SetdmssubscriptionsTableddConfig();
  });
this.dmsdocumentservice.dmsarchiverestorerequests = res.dmsarchiverestorerequests;
this.SetdmsarchiverestorerequestsTableConfig();
this.dmsarchiverestorerequestsLoadTable();
  setTimeout(() => {
  this.SetdmsarchiverestorerequestsTableddConfig();
  });
this.dmsdocumentservice.dmsaudittrails = res.dmsaudittrails;
this.SetdmsaudittrailsTableConfig();
this.dmsaudittrailsLoadTable();
  setTimeout(() => {
  this.SetdmsaudittrailsTableddConfig();
  });
this.dmsdocumentservice.dmsdocumentfields = res.dmsdocumentfields;
this.SetdmsdocumentfieldsTableConfig();
this.dmsdocumentfieldsLoadTable();
  setTimeout(() => {
  this.SetdmsdocumentfieldsTableddConfig();
  });
this.dmsdocumentservice.dmslinkeddocuments = res.dmslinkeddocuments;
this.SetdmslinkeddocumentsTableConfig();
this.dmslinkeddocumentsLoadTable();
  setTimeout(() => {
  this.SetdmslinkeddocumentsTableddConfig();
  });
this.dmsdocumentservice.dmslinks = res.dmslinks;
this.SetdmslinksTableConfig();
this.dmslinksLoadTable();
  setTimeout(() => {
  this.SetdmslinksTableddConfig();
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
  for (let key in this.dmsdocumentForm.controls) {
    if (this.dmsdocumentForm.controls[key] != null) {
if( key=="documentimage" ||  key=="thumbnail")
{
if(this.dmsdocumentservice.formData!=null && this.dmsdocumentservice.formData[key]!=null  && this.dmsdocumentservice.formData[key]!='[]' && this.dmsdocumentservice.formData[key]!=undefined && this.dmsdocumentservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.dmsdocumentservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.dmsdocumentservice.formData!=null && this.dmsdocumentservice.formData[key]!=null   && this.dmsdocumentservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.dmsdocumentservice.formData[key]+"></div>");
}
else if(false)
{
if(this.dmsdocumentservice.formData!=null && this.dmsdocumentservice.formData[key]!=null   && this.dmsdocumentservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.dmsdocumentservice.formData[key]+"'><div class='progress__number'>"+this.dmsdocumentservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.dmsdocumentForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.dmsdocumentForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.dmsdocumentForm.value;
obj.versiondate=new Date(this.dmsdocumentForm.get('versiondate').value ? this.ngbDateParserFormatter.format(this.dmsdocumentForm.get('versiondate').value)+'  UTC' :null);
obj.receiptdate=new Date(this.dmsdocumentForm.get('receiptdate').value ? this.ngbDateParserFormatter.format(this.dmsdocumentForm.get('receiptdate').value)+'  UTC' :null);
if(this.dmsdocumentForm.get('metatag').value!=null)obj.metatag=JSON.stringify(this.dmsdocumentForm.get('metatag').value);
obj.checkoutdatetime=new Date(this.dmsdocumentForm.get('checkoutdatetime').value ? this.ngbDateParserFormatter.format(this.dmsdocumentForm.get('checkoutdatetime').value)+'  UTC' :null);
obj.expirationdate=new Date(this.dmsdocumentForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.dmsdocumentForm.get('expirationdate').value)+'  UTC' :null);
if(this.dmsdocumentForm.get('remarks').value!=null)obj.remarks=JSON.stringify(this.dmsdocumentForm.get('remarks').value);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.documentimage.getattachmentlist()!=null)obj.documentimage=JSON.stringify(this.documentimage.getattachmentlist());
if(this.documentimage.getattachmentlist()!=null)obj.documentimage=JSON.stringify(this.documentimage.getattachmentlist());
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.documentimage.getAllFiles());
await this.sharedService.upload(this.thumbnail.getAllFiles());
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

private dmsdocumenttoggleOption(){
this.dmsdocumentshowOption = this.dmsdocumentshowOption === true ? false : true;
}

private bodocumentcontroltoggleOption(){
this.bodocumentcontrolshowOption = this.bodocumentcontrolshowOption === true ? false : true;
}

private dmssubscriptiontoggleOption(){
this.dmssubscriptionshowOption = this.dmssubscriptionshowOption === true ? false : true;
}

private dmsarchiverestorerequesttoggleOption(){
this.dmsarchiverestorerequestshowOption = this.dmsarchiverestorerequestshowOption === true ? false : true;
}

private dmsaudittrailtoggleOption(){
this.dmsaudittrailshowOption = this.dmsaudittrailshowOption === true ? false : true;
}

private dmsdocumentfieldtoggleOption(){
this.dmsdocumentfieldshowOption = this.dmsdocumentfieldshowOption === true ? false : true;
}

private dmslinkeddocumenttoggleOption(){
this.dmslinkeddocumentshowOption = this.dmslinkeddocumentshowOption === true ? false : true;
}

private dmslinktoggleOption(){
this.dmslinkshowOption = this.dmslinkshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.dmsdocumentForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.dmsdocumentForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.dmsdocumentForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.dmsdocumentservice.formData=this.dmsdocumentForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.dmsdocumentForm.controls[key] != null)
    {
        this.dmsdocumentservice.formData[key] = this.dmsdocumentForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.dmsdocumentservice.formData.versiondate=new Date(this.dmsdocumentForm.get('versiondate').value ? this.ngbDateParserFormatter.format(this.dmsdocumentForm.get('versiondate').value)+'  UTC' :null);
this.dmsdocumentservice.formData.documentimage=this.dmsdocumentForm.get('documentimage').value;
this.dmsdocumentservice.formData.thumbnail=this.dmsdocumentForm.get('thumbnail').value;
this.dmsdocumentservice.formData.receiptdate=new Date(this.dmsdocumentForm.get('receiptdate').value ? this.ngbDateParserFormatter.format(this.dmsdocumentForm.get('receiptdate').value)+'  UTC' :null);
if(this.dmsdocumentForm.get('metatag').value!=null)this.dmsdocumentservice.formData.metatag=JSON.stringify(this.dmsdocumentForm.get('metatag').value);
this.dmsdocumentservice.formData.checkoutdatetime=new Date(this.dmsdocumentForm.get('checkoutdatetime').value ? this.ngbDateParserFormatter.format(this.dmsdocumentForm.get('checkoutdatetime').value)+'  UTC' :null);
this.dmsdocumentservice.formData.expirationdate=new Date(this.dmsdocumentForm.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.dmsdocumentForm.get('expirationdate').value)+'  UTC' :null);
if(this.dmsdocumentForm.get('remarks').value!=null)this.dmsdocumentservice.formData.remarks=JSON.stringify(this.dmsdocumentForm.get('remarks').value);
if(customfields!=null)this.dmsdocumentservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.dmsdocumentservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.dmsdocumentservice.formData.DeletedbodocumentcontrolIDs = this.DeletedbodocumentcontrolIDs;
this.dmsdocumentservice.formData.DeleteddmssubscriptionIDs = this.DeleteddmssubscriptionIDs;
this.dmsdocumentservice.formData.DeleteddmsarchiverestorerequestIDs = this.DeleteddmsarchiverestorerequestIDs;
this.dmsdocumentservice.formData.DeleteddmsaudittrailIDs = this.DeleteddmsaudittrailIDs;
this.dmsdocumentservice.formData.DeleteddmsdocumentfieldIDs = this.DeleteddmsdocumentfieldIDs;
this.dmsdocumentservice.formData.DeleteddmslinkeddocumentIDs = this.DeleteddmslinkeddocumentIDs;
this.dmsdocumentservice.formData.DeleteddmslinkIDs = this.DeleteddmslinkIDs;
if(this.documentimage.getattachmentlist()!=null)this.dmsdocumentservice.formData.documentimage=JSON.stringify(this.documentimage.getattachmentlist());
if(this.documentimage.getattachmentlist()!=null)this.dmsdocumentservice.formData.documentimage=JSON.stringify(this.documentimage.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.dmsdocumentservice.formData);
this.dmsdocumentservice.formData=this.dmsdocumentForm.value;
this.dmsdocumentservice.saveOrUpdatedmsdocuments().subscribe(
async res => {
await this.sharedService.upload(this.documentimage.getAllFiles());
await this.sharedService.upload(this.thumbnail.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.bodocumentcontrolssource.data)
{
    for (let i = 0; i < this.bodocumentcontrolssource.data.length; i++)
    {
        if (this.bodocumentcontrolssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bodocumentcontrolssource.data[i].fileattachmentlist);
    }
}
if (this.dmssubscriptionssource.data)
{
    for (let i = 0; i < this.dmssubscriptionssource.data.length; i++)
    {
        if (this.dmssubscriptionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.dmssubscriptionssource.data[i].fileattachmentlist);
    }
}
if (this.dmsarchiverestorerequestssource.data)
{
    for (let i = 0; i < this.dmsarchiverestorerequestssource.data.length; i++)
    {
        if (this.dmsarchiverestorerequestssource.data[i].fileattachmentlist)await this.sharedService.upload(this.dmsarchiverestorerequestssource.data[i].fileattachmentlist);
    }
}
if (this.dmsaudittrailssource.data)
{
    for (let i = 0; i < this.dmsaudittrailssource.data.length; i++)
    {
        if (this.dmsaudittrailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.dmsaudittrailssource.data[i].fileattachmentlist);
    }
}
if (this.dmsdocumentfieldssource.data)
{
    for (let i = 0; i < this.dmsdocumentfieldssource.data.length; i++)
    {
        if (this.dmsdocumentfieldssource.data[i].fileattachmentlist)await this.sharedService.upload(this.dmsdocumentfieldssource.data[i].fileattachmentlist);
    }
}
if (this.dmslinkeddocumentssource.data)
{
    for (let i = 0; i < this.dmslinkeddocumentssource.data.length; i++)
    {
        if (this.dmslinkeddocumentssource.data[i].fileattachmentlist)await this.sharedService.upload(this.dmslinkeddocumentssource.data[i].fileattachmentlist);
    }
}
if (this.dmslinkssource.data)
{
    for (let i = 0; i < this.dmslinkssource.data.length; i++)
    {
        if (this.dmslinkssource.data[i].fileattachmentlist)await this.sharedService.upload(this.dmslinkssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsdocument);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.dmsdocumentservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsdocument);
}
else
{
this.FillData(res);
}
}
this.dmsdocumentForm.markAsUntouched();
this.dmsdocumentForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditfolderid( folderid) {
/*let ScreenType='2';
this.dialog.open(dmsfolderComponent, 
{
data: {folderid:this.dmsdocumentForm.get('folderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.dmsdocumentForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcheckoutby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.dmsdocumentForm.get('checkoutby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbodocumentcontrol(event:any,controlid:any, documentid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bodocumentcontrolComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,controlid, documentid,visiblelist:this.bodocumentcontrolsvisiblelist,  hidelist:this.bodocumentcontrolshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bodocumentcontrolssource.add(res);
this.bodocumentcontrolssource.refresh();
}
else
{
this.bodocumentcontrolssource.update(event.data, res);
}
}
});
}

onDeletebodocumentcontrol(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbodocumentcontrolIDs += childID + ",";
this.dmsdocumentservice.bodocumentcontrols.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditdmssubscription(event:any,subscriptionid:any, documentid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(dmssubscriptionComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,subscriptionid, documentid,visiblelist:this.dmssubscriptionsvisiblelist,  hidelist:this.dmssubscriptionshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.dmssubscriptionssource.add(res);
this.dmssubscriptionssource.refresh();
}
else
{
this.dmssubscriptionssource.update(event.data, res);
}
}
});
}

onDeletedmssubscription(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteddmssubscriptionIDs += childID + ",";
this.dmsdocumentservice.dmssubscriptions.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditdmsarchiverestorerequest(event:any,requestid:any, documentid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(dmsarchiverestorerequestComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,requestid, documentid,visiblelist:this.dmsarchiverestorerequestsvisiblelist,  hidelist:this.dmsarchiverestorerequestshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.dmsarchiverestorerequestssource.add(res);
this.dmsarchiverestorerequestssource.refresh();
}
else
{
this.dmsarchiverestorerequestssource.update(event.data, res);
}
}
});
}

onDeletedmsarchiverestorerequest(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteddmsarchiverestorerequestIDs += childID + ",";
this.dmsdocumentservice.dmsarchiverestorerequests.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditdmsaudittrail(event:any,audittrailid:any, documentid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(dmsaudittrailComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,audittrailid, documentid,visiblelist:this.dmsaudittrailsvisiblelist,  hidelist:this.dmsaudittrailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.dmsaudittrailssource.add(res);
this.dmsaudittrailssource.refresh();
}
else
{
this.dmsaudittrailssource.update(event.data, res);
}
}
});
}

onDeletedmsaudittrail(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteddmsaudittrailIDs += childID + ",";
this.dmsdocumentservice.dmsaudittrails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditdmsdocumentfield(event:any,propertyid:any, documentid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(dmsdocumentfieldComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,propertyid, documentid,visiblelist:this.dmsdocumentfieldsvisiblelist,  hidelist:this.dmsdocumentfieldshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.dmsdocumentfieldssource.add(res);
this.dmsdocumentfieldssource.refresh();
}
else
{
this.dmsdocumentfieldssource.update(event.data, res);
}
}
});
}

onDeletedmsdocumentfield(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteddmsdocumentfieldIDs += childID + ",";
this.dmsdocumentservice.dmsdocumentfields.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditdmslinkeddocument(event:any,linkedid:any, documentid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(dmslinkeddocumentComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,linkedid, documentid,visiblelist:this.dmslinkeddocumentsvisiblelist,  hidelist:this.dmslinkeddocumentshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.dmslinkeddocumentssource.add(res);
this.dmslinkeddocumentssource.refresh();
}
else
{
this.dmslinkeddocumentssource.update(event.data, res);
}
}
});
}

onDeletedmslinkeddocument(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteddmslinkeddocumentIDs += childID + ",";
this.dmsdocumentservice.dmslinkeddocuments.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditdmslink(event:any,linkid:any, documentid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(dmslinkComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,linkid, documentid,visiblelist:this.dmslinksvisiblelist,  hidelist:this.dmslinkshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.dmslinkssource.add(res);
this.dmslinkssource.refresh();
}
else
{
this.dmslinkssource.update(event.data, res);
}
}
});
}

onDeletedmslink(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteddmslinkIDs += childID + ",";
this.dmsdocumentservice.dmslinks.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bodocumentcontrols
bodocumentcontrolssettings:any;
bodocumentcontrolssource: any;

showbodocumentcontrolsCheckbox()
{
debugger;
if(this.tblbodocumentcontrolssource.settings['selectMode']== 'multi')this.tblbodocumentcontrolssource.settings['selectMode']= 'single';
else
this.tblbodocumentcontrolssource.settings['selectMode']= 'multi';
this.tblbodocumentcontrolssource.initGrid();
}
deletebodocumentcontrolsAll()
{
this.tblbodocumentcontrolssource.settings['selectMode'] = 'single';
}
showbodocumentcontrolsFilter()
{
  setTimeout(() => {
  this.SetbodocumentcontrolsTableddConfig();
  });
      if(this.tblbodocumentcontrolssource.settings!=null)this.tblbodocumentcontrolssource.settings['hideSubHeader'] =!this.tblbodocumentcontrolssource.settings['hideSubHeader'];
this.tblbodocumentcontrolssource.initGrid();
}
showbodocumentcontrolsInActive()
{
}
enablebodocumentcontrolsInActive()
{
}
async SetbodocumentcontrolsTableddConfig()
{
if(!this.bfilterPopulatebodocumentcontrols){
}
this.bfilterPopulatebodocumentcontrols=true;
}
async bodocumentcontrolsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbodocumentcontrolsTableConfig()
{
this.bodocumentcontrolssettings = {
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
action: {
title: 'Action',
type: '',
filter:true,
},
userid: {
title: 'User',
type: 'number',
filter:true,
},
actiondatetime: {
title: 'Action Date Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
},
};
}
bodocumentcontrolsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bodocumentcontrolsID)>=0)
{
this.bodocumentcontrolssource=new LocalDataSource();
this.bodocumentcontrolssource.load(this.dmsdocumentservice.bodocumentcontrols as  any as LocalDataSource);
this.bodocumentcontrolssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bodocumentcontrolsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.dmsdocumentservice.bodocumentcontrols.length == 0)
{
    this.tblbodocumentcontrolssource.grid.createFormShown = true;
}
else
{
    let obj = new bodocumentcontrol();
    this.dmsdocumentservice.bodocumentcontrols.push(obj);
    this.bodocumentcontrolssource.refresh();
    if ((this.dmsdocumentservice.bodocumentcontrols.length / this.bodocumentcontrolssource.getPaging().perPage).toFixed(0) + 1 != this.bodocumentcontrolssource.getPaging().page)
    {
        this.bodocumentcontrolssource.setPage((this.dmsdocumentservice.bodocumentcontrols.length / this.bodocumentcontrolssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbodocumentcontrolssource.grid.edit(this.tblbodocumentcontrolssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bodocumentcontrolssource.data.indexOf(event.data);
this.onDeletebodocumentcontrol(event,event.data.controlid,((this.bodocumentcontrolssource.getPaging().page-1) *this.bodocumentcontrolssource.getPaging().perPage)+index);
this.bodocumentcontrolssource.refresh();
break;
}
}

*/
bodocumentcontrolsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbodocumentcontrol(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbodocumentcontrol(event,event.data.controlid,this.formid);
break;
case 'delete':
this.onDeletebodocumentcontrol(event,event.data.controlid,((this.bodocumentcontrolssource.getPaging().page-1) *this.bodocumentcontrolssource.getPaging().perPage)+event.index);
this.bodocumentcontrolssource.refresh();
break;
}
}
bodocumentcontrolsonDelete(obj) {
let controlid=obj.data.controlid;
if (confirm('Are you sure to delete this record ?')) {
this.dmsdocumentservice.deletedmsdocument(controlid).then(res=>
this.bodocumentcontrolsLoadTable()
);
}
}
bodocumentcontrolsPaging(val)
{
debugger;
this.bodocumentcontrolssource.setPaging(1, val, true);
}

handlebodocumentcontrolsGridSelected(event:any) {
this.bodocumentcontrolsselectedindex=this.dmsdocumentservice.bodocumentcontrols.findIndex(i => i.controlid === event.data.controlid);
}
IsbodocumentcontrolsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bodocumentcontrolsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bodocumentcontrols
//start of Grid Codes dmssubscriptions
dmssubscriptionssettings:any;
dmssubscriptionssource: any;

showdmssubscriptionsCheckbox()
{
debugger;
if(this.tbldmssubscriptionssource.settings['selectMode']== 'multi')this.tbldmssubscriptionssource.settings['selectMode']= 'single';
else
this.tbldmssubscriptionssource.settings['selectMode']= 'multi';
this.tbldmssubscriptionssource.initGrid();
}
deletedmssubscriptionsAll()
{
this.tbldmssubscriptionssource.settings['selectMode'] = 'single';
}
showdmssubscriptionsFilter()
{
  setTimeout(() => {
  this.SetdmssubscriptionsTableddConfig();
  });
      if(this.tbldmssubscriptionssource.settings!=null)this.tbldmssubscriptionssource.settings['hideSubHeader'] =!this.tbldmssubscriptionssource.settings['hideSubHeader'];
this.tbldmssubscriptionssource.initGrid();
}
showdmssubscriptionsInActive()
{
}
enabledmssubscriptionsInActive()
{
}
async SetdmssubscriptionsTableddConfig()
{
if(!this.bfilterPopulatedmssubscriptions){
}
this.bfilterPopulatedmssubscriptions=true;
}
async dmssubscriptionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetdmssubscriptionsTableConfig()
{
this.dmssubscriptionssettings = {
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
userid: {
title: 'User',
type: 'number',
filter:true,
},
subscribeddate: {
title: 'Subscribed Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
subscriptionstatus: {
title: 'Subscription Status',
type: '',
filter:true,
},
},
};
}
dmssubscriptionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmssubscriptionsID)>=0)
{
this.dmssubscriptionssource=new LocalDataSource();
this.dmssubscriptionssource.load(this.dmsdocumentservice.dmssubscriptions as  any as LocalDataSource);
this.dmssubscriptionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
dmssubscriptionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.dmsdocumentservice.dmssubscriptions.length == 0)
{
    this.tbldmssubscriptionssource.grid.createFormShown = true;
}
else
{
    let obj = new dmssubscription();
    this.dmsdocumentservice.dmssubscriptions.push(obj);
    this.dmssubscriptionssource.refresh();
    if ((this.dmsdocumentservice.dmssubscriptions.length / this.dmssubscriptionssource.getPaging().perPage).toFixed(0) + 1 != this.dmssubscriptionssource.getPaging().page)
    {
        this.dmssubscriptionssource.setPage((this.dmsdocumentservice.dmssubscriptions.length / this.dmssubscriptionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbldmssubscriptionssource.grid.edit(this.tbldmssubscriptionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.dmssubscriptionssource.data.indexOf(event.data);
this.onDeletedmssubscription(event,event.data.subscriptionid,((this.dmssubscriptionssource.getPaging().page-1) *this.dmssubscriptionssource.getPaging().perPage)+index);
this.dmssubscriptionssource.refresh();
break;
}
}

*/
dmssubscriptionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditdmssubscription(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditdmssubscription(event,event.data.subscriptionid,this.formid);
break;
case 'delete':
this.onDeletedmssubscription(event,event.data.subscriptionid,((this.dmssubscriptionssource.getPaging().page-1) *this.dmssubscriptionssource.getPaging().perPage)+event.index);
this.dmssubscriptionssource.refresh();
break;
}
}
dmssubscriptionsonDelete(obj) {
let subscriptionid=obj.data.subscriptionid;
if (confirm('Are you sure to delete this record ?')) {
this.dmsdocumentservice.deletedmsdocument(subscriptionid).then(res=>
this.dmssubscriptionsLoadTable()
);
}
}
dmssubscriptionsPaging(val)
{
debugger;
this.dmssubscriptionssource.setPaging(1, val, true);
}

handledmssubscriptionsGridSelected(event:any) {
this.dmssubscriptionsselectedindex=this.dmsdocumentservice.dmssubscriptions.findIndex(i => i.subscriptionid === event.data.subscriptionid);
}
IsdmssubscriptionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmssubscriptionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes dmssubscriptions
//start of Grid Codes dmsarchiverestorerequests
dmsarchiverestorerequestssettings:any;
dmsarchiverestorerequestssource: any;

showdmsarchiverestorerequestsCheckbox()
{
debugger;
if(this.tbldmsarchiverestorerequestssource.settings['selectMode']== 'multi')this.tbldmsarchiverestorerequestssource.settings['selectMode']= 'single';
else
this.tbldmsarchiverestorerequestssource.settings['selectMode']= 'multi';
this.tbldmsarchiverestorerequestssource.initGrid();
}
deletedmsarchiverestorerequestsAll()
{
this.tbldmsarchiverestorerequestssource.settings['selectMode'] = 'single';
}
showdmsarchiverestorerequestsFilter()
{
  setTimeout(() => {
  this.SetdmsarchiverestorerequestsTableddConfig();
  });
      if(this.tbldmsarchiverestorerequestssource.settings!=null)this.tbldmsarchiverestorerequestssource.settings['hideSubHeader'] =!this.tbldmsarchiverestorerequestssource.settings['hideSubHeader'];
this.tbldmsarchiverestorerequestssource.initGrid();
}
showdmsarchiverestorerequestsInActive()
{
}
enabledmsarchiverestorerequestsInActive()
{
}
async SetdmsarchiverestorerequestsTableddConfig()
{
if(!this.bfilterPopulatedmsarchiverestorerequests){
}
this.bfilterPopulatedmsarchiverestorerequests=true;
}
async dmsarchiverestorerequestsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetdmsarchiverestorerequestsTableConfig()
{
this.dmsarchiverestorerequestssettings = {
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
requesteddate: {
title: 'Requested Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
requestuserid: {
title: 'Request User',
type: 'number',
filter:true,
},
adminuserid: {
title: 'Admin User',
type: 'number',
filter:true,
},
comments: {
title: 'Comments',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
dmsarchiverestorerequestsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmsarchiverestorerequestsID)>=0)
{
this.dmsarchiverestorerequestssource=new LocalDataSource();
this.dmsarchiverestorerequestssource.load(this.dmsdocumentservice.dmsarchiverestorerequests as  any as LocalDataSource);
this.dmsarchiverestorerequestssource.setPaging(1, 20, true);
}
}

//external to inline
/*
dmsarchiverestorerequestsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.dmsdocumentservice.dmsarchiverestorerequests.length == 0)
{
    this.tbldmsarchiverestorerequestssource.grid.createFormShown = true;
}
else
{
    let obj = new dmsarchiverestorerequest();
    this.dmsdocumentservice.dmsarchiverestorerequests.push(obj);
    this.dmsarchiverestorerequestssource.refresh();
    if ((this.dmsdocumentservice.dmsarchiverestorerequests.length / this.dmsarchiverestorerequestssource.getPaging().perPage).toFixed(0) + 1 != this.dmsarchiverestorerequestssource.getPaging().page)
    {
        this.dmsarchiverestorerequestssource.setPage((this.dmsdocumentservice.dmsarchiverestorerequests.length / this.dmsarchiverestorerequestssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbldmsarchiverestorerequestssource.grid.edit(this.tbldmsarchiverestorerequestssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.dmsarchiverestorerequestssource.data.indexOf(event.data);
this.onDeletedmsarchiverestorerequest(event,event.data.requestid,((this.dmsarchiverestorerequestssource.getPaging().page-1) *this.dmsarchiverestorerequestssource.getPaging().perPage)+index);
this.dmsarchiverestorerequestssource.refresh();
break;
}
}

*/
dmsarchiverestorerequestsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditdmsarchiverestorerequest(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditdmsarchiverestorerequest(event,event.data.requestid,this.formid);
break;
case 'delete':
this.onDeletedmsarchiverestorerequest(event,event.data.requestid,((this.dmsarchiverestorerequestssource.getPaging().page-1) *this.dmsarchiverestorerequestssource.getPaging().perPage)+event.index);
this.dmsarchiverestorerequestssource.refresh();
break;
}
}
dmsarchiverestorerequestsonDelete(obj) {
let requestid=obj.data.requestid;
if (confirm('Are you sure to delete this record ?')) {
this.dmsdocumentservice.deletedmsdocument(requestid).then(res=>
this.dmsarchiverestorerequestsLoadTable()
);
}
}
dmsarchiverestorerequestsPaging(val)
{
debugger;
this.dmsarchiverestorerequestssource.setPaging(1, val, true);
}

handledmsarchiverestorerequestsGridSelected(event:any) {
this.dmsarchiverestorerequestsselectedindex=this.dmsdocumentservice.dmsarchiverestorerequests.findIndex(i => i.requestid === event.data.requestid);
}
IsdmsarchiverestorerequestsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmsarchiverestorerequestsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes dmsarchiverestorerequests
//start of Grid Codes dmsaudittrails
dmsaudittrailssettings:any;
dmsaudittrailssource: any;

showdmsaudittrailsCheckbox()
{
debugger;
if(this.tbldmsaudittrailssource.settings['selectMode']== 'multi')this.tbldmsaudittrailssource.settings['selectMode']= 'single';
else
this.tbldmsaudittrailssource.settings['selectMode']= 'multi';
this.tbldmsaudittrailssource.initGrid();
}
deletedmsaudittrailsAll()
{
this.tbldmsaudittrailssource.settings['selectMode'] = 'single';
}
showdmsaudittrailsFilter()
{
  setTimeout(() => {
  this.SetdmsaudittrailsTableddConfig();
  });
      if(this.tbldmsaudittrailssource.settings!=null)this.tbldmsaudittrailssource.settings['hideSubHeader'] =!this.tbldmsaudittrailssource.settings['hideSubHeader'];
this.tbldmsaudittrailssource.initGrid();
}
showdmsaudittrailsInActive()
{
}
enabledmsaudittrailsInActive()
{
}
async SetdmsaudittrailsTableddConfig()
{
if(!this.bfilterPopulatedmsaudittrails){
}
this.bfilterPopulatedmsaudittrails=true;
}
async dmsaudittrailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetdmsaudittrailsTableConfig()
{
this.dmsaudittrailssettings = {
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
versionnumber: {
title: 'Version Number',
type: 'number',
filter:true,
},
userid: {
title: 'User',
type: 'number',
filter:true,
},
action: {
title: 'Action',
type: '',
filter:true,
},
actiondate: {
title: 'Action Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
actiondetails: {
title: 'Action Details',
type: '',
filter:true,
},
comment: {
title: 'Comment',
type: '',
filter:true,
},
},
};
}
dmsaudittrailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmsaudittrailsID)>=0)
{
this.dmsaudittrailssource=new LocalDataSource();
this.dmsaudittrailssource.load(this.dmsdocumentservice.dmsaudittrails as  any as LocalDataSource);
this.dmsaudittrailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
dmsaudittrailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.dmsdocumentservice.dmsaudittrails.length == 0)
{
    this.tbldmsaudittrailssource.grid.createFormShown = true;
}
else
{
    let obj = new dmsaudittrail();
    this.dmsdocumentservice.dmsaudittrails.push(obj);
    this.dmsaudittrailssource.refresh();
    if ((this.dmsdocumentservice.dmsaudittrails.length / this.dmsaudittrailssource.getPaging().perPage).toFixed(0) + 1 != this.dmsaudittrailssource.getPaging().page)
    {
        this.dmsaudittrailssource.setPage((this.dmsdocumentservice.dmsaudittrails.length / this.dmsaudittrailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbldmsaudittrailssource.grid.edit(this.tbldmsaudittrailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.dmsaudittrailssource.data.indexOf(event.data);
this.onDeletedmsaudittrail(event,event.data.audittrailid,((this.dmsaudittrailssource.getPaging().page-1) *this.dmsaudittrailssource.getPaging().perPage)+index);
this.dmsaudittrailssource.refresh();
break;
}
}

*/
dmsaudittrailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditdmsaudittrail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditdmsaudittrail(event,event.data.audittrailid,this.formid);
break;
case 'delete':
this.onDeletedmsaudittrail(event,event.data.audittrailid,((this.dmsaudittrailssource.getPaging().page-1) *this.dmsaudittrailssource.getPaging().perPage)+event.index);
this.dmsaudittrailssource.refresh();
break;
}
}
dmsaudittrailsonDelete(obj) {
let audittrailid=obj.data.audittrailid;
if (confirm('Are you sure to delete this record ?')) {
this.dmsdocumentservice.deletedmsdocument(audittrailid).then(res=>
this.dmsaudittrailsLoadTable()
);
}
}
dmsaudittrailsPaging(val)
{
debugger;
this.dmsaudittrailssource.setPaging(1, val, true);
}

handledmsaudittrailsGridSelected(event:any) {
this.dmsaudittrailsselectedindex=this.dmsdocumentservice.dmsaudittrails.findIndex(i => i.audittrailid === event.data.audittrailid);
}
IsdmsaudittrailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmsaudittrailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes dmsaudittrails
//start of Grid Codes dmsdocumentfields
dmsdocumentfieldssettings:any;
dmsdocumentfieldssource: any;

showdmsdocumentfieldsCheckbox()
{
debugger;
if(this.tbldmsdocumentfieldssource.settings['selectMode']== 'multi')this.tbldmsdocumentfieldssource.settings['selectMode']= 'single';
else
this.tbldmsdocumentfieldssource.settings['selectMode']= 'multi';
this.tbldmsdocumentfieldssource.initGrid();
}
deletedmsdocumentfieldsAll()
{
this.tbldmsdocumentfieldssource.settings['selectMode'] = 'single';
}
showdmsdocumentfieldsFilter()
{
  setTimeout(() => {
  this.SetdmsdocumentfieldsTableddConfig();
  });
      if(this.tbldmsdocumentfieldssource.settings!=null)this.tbldmsdocumentfieldssource.settings['hideSubHeader'] =!this.tbldmsdocumentfieldssource.settings['hideSubHeader'];
this.tbldmsdocumentfieldssource.initGrid();
}
showdmsdocumentfieldsInActive()
{
}
enabledmsdocumentfieldsInActive()
{
}
async SetdmsdocumentfieldsTableddConfig()
{
if(!this.bfilterPopulatedmsdocumentfields){
}
this.bfilterPopulatedmsdocumentfields=true;
}
async dmsdocumentfieldsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetdmsdocumentfieldsTableConfig()
{
this.dmsdocumentfieldssettings = {
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
propertyname: {
title: 'Property Name',
type: '',
filter:true,
},
value: {
title: 'Value',
type: '',
filter:true,
},
},
};
}
dmsdocumentfieldsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmsdocumentfieldsID)>=0)
{
this.dmsdocumentfieldssource=new LocalDataSource();
this.dmsdocumentfieldssource.load(this.dmsdocumentservice.dmsdocumentfields as  any as LocalDataSource);
this.dmsdocumentfieldssource.setPaging(1, 20, true);
}
}

//external to inline
/*
dmsdocumentfieldsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.dmsdocumentservice.dmsdocumentfields.length == 0)
{
    this.tbldmsdocumentfieldssource.grid.createFormShown = true;
}
else
{
    let obj = new dmsdocumentfield();
    this.dmsdocumentservice.dmsdocumentfields.push(obj);
    this.dmsdocumentfieldssource.refresh();
    if ((this.dmsdocumentservice.dmsdocumentfields.length / this.dmsdocumentfieldssource.getPaging().perPage).toFixed(0) + 1 != this.dmsdocumentfieldssource.getPaging().page)
    {
        this.dmsdocumentfieldssource.setPage((this.dmsdocumentservice.dmsdocumentfields.length / this.dmsdocumentfieldssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbldmsdocumentfieldssource.grid.edit(this.tbldmsdocumentfieldssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.dmsdocumentfieldssource.data.indexOf(event.data);
this.onDeletedmsdocumentfield(event,event.data.propertyid,((this.dmsdocumentfieldssource.getPaging().page-1) *this.dmsdocumentfieldssource.getPaging().perPage)+index);
this.dmsdocumentfieldssource.refresh();
break;
}
}

*/
dmsdocumentfieldsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditdmsdocumentfield(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditdmsdocumentfield(event,event.data.propertyid,this.formid);
break;
case 'delete':
this.onDeletedmsdocumentfield(event,event.data.propertyid,((this.dmsdocumentfieldssource.getPaging().page-1) *this.dmsdocumentfieldssource.getPaging().perPage)+event.index);
this.dmsdocumentfieldssource.refresh();
break;
}
}
dmsdocumentfieldsonDelete(obj) {
let propertyid=obj.data.propertyid;
if (confirm('Are you sure to delete this record ?')) {
this.dmsdocumentservice.deletedmsdocument(propertyid).then(res=>
this.dmsdocumentfieldsLoadTable()
);
}
}
dmsdocumentfieldsPaging(val)
{
debugger;
this.dmsdocumentfieldssource.setPaging(1, val, true);
}

handledmsdocumentfieldsGridSelected(event:any) {
this.dmsdocumentfieldsselectedindex=this.dmsdocumentservice.dmsdocumentfields.findIndex(i => i.propertyid === event.data.propertyid);
}
IsdmsdocumentfieldsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmsdocumentfieldsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes dmsdocumentfields
//start of Grid Codes dmslinkeddocuments
dmslinkeddocumentssettings:any;
dmslinkeddocumentssource: any;

showdmslinkeddocumentsCheckbox()
{
debugger;
if(this.tbldmslinkeddocumentssource.settings['selectMode']== 'multi')this.tbldmslinkeddocumentssource.settings['selectMode']= 'single';
else
this.tbldmslinkeddocumentssource.settings['selectMode']= 'multi';
this.tbldmslinkeddocumentssource.initGrid();
}
deletedmslinkeddocumentsAll()
{
this.tbldmslinkeddocumentssource.settings['selectMode'] = 'single';
}
showdmslinkeddocumentsFilter()
{
  setTimeout(() => {
  this.SetdmslinkeddocumentsTableddConfig();
  });
      if(this.tbldmslinkeddocumentssource.settings!=null)this.tbldmslinkeddocumentssource.settings['hideSubHeader'] =!this.tbldmslinkeddocumentssource.settings['hideSubHeader'];
this.tbldmslinkeddocumentssource.initGrid();
}
showdmslinkeddocumentsInActive()
{
}
enabledmslinkeddocumentsInActive()
{
}
async SetdmslinkeddocumentsTableddConfig()
{
if(!this.bfilterPopulatedmslinkeddocuments){
}
this.bfilterPopulatedmslinkeddocuments=true;
}
async dmslinkeddocumentsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetdmslinkeddocumentsTableConfig()
{
this.dmslinkeddocumentssettings = {
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
linkeddocumentid: {
title: 'Linked Document',
type: 'number',
filter:true,
},
linktype: {
title: 'Link Type',
type: '',
filter:true,
},
},
};
}
dmslinkeddocumentsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmslinkeddocumentsID)>=0)
{
this.dmslinkeddocumentssource=new LocalDataSource();
this.dmslinkeddocumentssource.load(this.dmsdocumentservice.dmslinkeddocuments as  any as LocalDataSource);
this.dmslinkeddocumentssource.setPaging(1, 20, true);
}
}

//external to inline
/*
dmslinkeddocumentsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.dmsdocumentservice.dmslinkeddocuments.length == 0)
{
    this.tbldmslinkeddocumentssource.grid.createFormShown = true;
}
else
{
    let obj = new dmslinkeddocument();
    this.dmsdocumentservice.dmslinkeddocuments.push(obj);
    this.dmslinkeddocumentssource.refresh();
    if ((this.dmsdocumentservice.dmslinkeddocuments.length / this.dmslinkeddocumentssource.getPaging().perPage).toFixed(0) + 1 != this.dmslinkeddocumentssource.getPaging().page)
    {
        this.dmslinkeddocumentssource.setPage((this.dmsdocumentservice.dmslinkeddocuments.length / this.dmslinkeddocumentssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbldmslinkeddocumentssource.grid.edit(this.tbldmslinkeddocumentssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.dmslinkeddocumentssource.data.indexOf(event.data);
this.onDeletedmslinkeddocument(event,event.data.linkedid,((this.dmslinkeddocumentssource.getPaging().page-1) *this.dmslinkeddocumentssource.getPaging().perPage)+index);
this.dmslinkeddocumentssource.refresh();
break;
}
}

*/
dmslinkeddocumentsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditdmslinkeddocument(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditdmslinkeddocument(event,event.data.linkedid,this.formid);
break;
case 'delete':
this.onDeletedmslinkeddocument(event,event.data.linkedid,((this.dmslinkeddocumentssource.getPaging().page-1) *this.dmslinkeddocumentssource.getPaging().perPage)+event.index);
this.dmslinkeddocumentssource.refresh();
break;
}
}
dmslinkeddocumentsonDelete(obj) {
let linkedid=obj.data.linkedid;
if (confirm('Are you sure to delete this record ?')) {
this.dmsdocumentservice.deletedmsdocument(linkedid).then(res=>
this.dmslinkeddocumentsLoadTable()
);
}
}
dmslinkeddocumentsPaging(val)
{
debugger;
this.dmslinkeddocumentssource.setPaging(1, val, true);
}

handledmslinkeddocumentsGridSelected(event:any) {
this.dmslinkeddocumentsselectedindex=this.dmsdocumentservice.dmslinkeddocuments.findIndex(i => i.linkedid === event.data.linkedid);
}
IsdmslinkeddocumentsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmslinkeddocumentsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes dmslinkeddocuments
//start of Grid Codes dmslinks
dmslinkssettings:any;
dmslinkssource: any;

showdmslinksCheckbox()
{
debugger;
if(this.tbldmslinkssource.settings['selectMode']== 'multi')this.tbldmslinkssource.settings['selectMode']= 'single';
else
this.tbldmslinkssource.settings['selectMode']= 'multi';
this.tbldmslinkssource.initGrid();
}
deletedmslinksAll()
{
this.tbldmslinkssource.settings['selectMode'] = 'single';
}
showdmslinksFilter()
{
  setTimeout(() => {
  this.SetdmslinksTableddConfig();
  });
      if(this.tbldmslinkssource.settings!=null)this.tbldmslinkssource.settings['hideSubHeader'] =!this.tbldmslinkssource.settings['hideSubHeader'];
this.tbldmslinkssource.initGrid();
}
showdmslinksInActive()
{
}
enabledmslinksInActive()
{
}
async SetdmslinksTableddConfig()
{
if(!this.bfilterPopulatedmslinks){
}
this.bfilterPopulatedmslinks=true;
}
async dmslinksbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetdmslinksTableConfig()
{
this.dmslinkssettings = {
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
url: {
title: 'U R L',
type: '',
filter:true,
},
linktype: {
title: 'Link Type',
type: '',
filter:true,
},
rank: {
title: 'Rank',
type: 'number',
filter:true,
},
},
};
}
dmslinksLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmslinksID)>=0)
{
this.dmslinkssource=new LocalDataSource();
this.dmslinkssource.load(this.dmsdocumentservice.dmslinks as  any as LocalDataSource);
this.dmslinkssource.setPaging(1, 20, true);
}
}

//external to inline
/*
dmslinksroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.dmsdocumentservice.dmslinks.length == 0)
{
    this.tbldmslinkssource.grid.createFormShown = true;
}
else
{
    let obj = new dmslink();
    this.dmsdocumentservice.dmslinks.push(obj);
    this.dmslinkssource.refresh();
    if ((this.dmsdocumentservice.dmslinks.length / this.dmslinkssource.getPaging().perPage).toFixed(0) + 1 != this.dmslinkssource.getPaging().page)
    {
        this.dmslinkssource.setPage((this.dmsdocumentservice.dmslinks.length / this.dmslinkssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbldmslinkssource.grid.edit(this.tbldmslinkssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.dmslinkssource.data.indexOf(event.data);
this.onDeletedmslink(event,event.data.linkid,((this.dmslinkssource.getPaging().page-1) *this.dmslinkssource.getPaging().perPage)+index);
this.dmslinkssource.refresh();
break;
}
}

*/
dmslinksroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditdmslink(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditdmslink(event,event.data.linkid,this.formid);
break;
case 'delete':
this.onDeletedmslink(event,event.data.linkid,((this.dmslinkssource.getPaging().page-1) *this.dmslinkssource.getPaging().perPage)+event.index);
this.dmslinkssource.refresh();
break;
}
}
dmslinksonDelete(obj) {
let linkid=obj.data.linkid;
if (confirm('Are you sure to delete this record ?')) {
this.dmsdocumentservice.deletedmsdocument(linkid).then(res=>
this.dmslinksLoadTable()
);
}
}
dmslinksPaging(val)
{
debugger;
this.dmslinkssource.setPaging(1, val, true);
}

handledmslinksGridSelected(event:any) {
this.dmslinksselectedindex=this.dmsdocumentservice.dmslinks.findIndex(i => i.linkid === event.data.linkid);
}
IsdmslinksVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmslinksID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes dmslinks

}



