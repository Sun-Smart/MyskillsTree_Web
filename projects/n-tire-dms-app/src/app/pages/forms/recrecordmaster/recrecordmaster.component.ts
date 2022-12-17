import { recrecordmasterService } from './../../../service/recrecordmaster.service';
import { recrecordmaster } from './../../../model/recrecordmaster.model';
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
import { recfolder} from './../../../model/recfolder.model';
import { recfolderComponent } from './../../../pages/forms/recfolder/recfolder.component';
import { recfolderService } from './../../../service/recfolder.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { reclinkedrecord } from './../../../model/reclinkedrecord.model';
import { reclinkedrecordComponent } from './../../../pages/forms/reclinkedrecord/reclinkedrecord.component';
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
selector: 'app-recrecordmaster',
templateUrl: './recrecordmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class recrecordmasterComponent implements OnInit {
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
bfilterPopulaterecrecordmasters:boolean=false;
datarecrecordmasterstype3:any=[];
datarecrecordmastersfolderid3:any=[];
datarecrecordmasterslanguage3:any=[];
datarecrecordmastersdocumenttype3:any=[];
datarecrecordmastersdocumentgroup3:any=[];
datarecrecordmasterscategory3:any=[];
datarecrecordmasterssubcategory3:any=[];
datareclinkedrecordsrecordid3:any=[];
bfilterPopulatereclinkedrecords:boolean=false;
@ViewChild('tblreclinkedrecordssource',{static:false}) tblreclinkedrecordssource: Ng2SmartTableComponent;
 recrecordmasterForm: FormGroup;
typeList: boconfigvalue[];
folderidList: recfolder[];
languageList: boconfigvalue[];
documenttypeList: boconfigvalue[];
documentgroupList: boconfigvalue[];
categoryList: bomasterdata[];
subcategoryList: bosubcategorymaster[];
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
recrecordmastershowOption:boolean;
reclinkedrecordshowOption:boolean;
sessiondata:any;
sourcekey:any;



reclinkedrecordsvisiblelist:any;
reclinkedrecordshidelist:any;

DeletedreclinkedrecordIDs: string="";
reclinkedrecordsID: string = "1";
reclinkedrecordsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private recrecordmasterservice: recrecordmasterService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private recfolderservice:recfolderService,
private bomasterdataservice:bomasterdataService,
private bosubcategorymasterservice:bosubcategorymasterService,
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
this.recrecordmasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
recordid: [null],
recorddate: [null],
type: [null],
typedesc: [null],
referencenumber: [null],
description: [null],
folderid: [null],
folderiddesc: [null],
documentreference: [null],
documenttitle: [null],
documentdate: [null],
language: [null],
languagedesc: [null],
documenttype: [null],
documenttypedesc: [null],
documentgroup: [null],
documentgroupdesc: [null],
metadata: [null],
category: [null],
categorydesc: [null],
subcategory: [null],
subcategorydesc: [null],
notes: [null],
remarks: [null],
owner: [null],
customfield: [null],
attachment: [null],
allcomments: [null],
comments: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.recrecordmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.recrecordmasterForm.dirty && this.recrecordmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.recordid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.recordid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.recordid && pkDetail) {
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
let recrecordmasterid = null;

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
this.formid=recrecordmasterid;
//this.sharedService.alert(recrecordmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetreclinkedrecordsTableConfig();
  setTimeout(() => {
  this.SetreclinkedrecordsTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("docrecordtype").then(res => this.typeList = res as boconfigvalue[]);
this.recfolderservice.getrecfoldersList().then(res =>{
            const nest = (items, id = null, link = 'parentid') =>
            items
              .filter(item => item[link] === id)
              .map(item => ({ ...item,id:item.folderid, label:item.foldername, children: nest(items, item.folderid) }));

this.folderidList = nest(res as any[]);
}).catch((err) => {console.log(err);});
this.configservice.getList("language").then(res => this.languageList = res as boconfigvalue[]);
this.configservice.getList("documenttype").then(res => this.documenttypeList = res as boconfigvalue[]);
this.configservice.getList("documentgroup").then(res => this.documentgroupList = res as boconfigvalue[]);
this.bomasterdataservice.getList("yy7ma").then(res => {
this.categoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res =>{
this.subcategoryList = res as bosubcategorymaster[];
if(this.recrecordmasterservice.formData && this.recrecordmasterservice.formData.subcategory){this.recrecordmasterForm.patchValue({
    subcategory: this.recrecordmasterservice.formData.subcategory,
    subcategorydesc: this.recrecordmasterservice.formData.subcategorydesc,
});
}
}).catch((err) => {console.log(err);});
});

//autocomplete
    this.recrecordmasterservice.getrecrecordmastersList().then(res => {
      this.pkList = res as recrecordmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.referencenumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.referencenumber;

//setting the flag that the screen is not touched 
this.recrecordmasterForm.markAsUntouched();
this.recrecordmasterForm.markAsPristine();
}



resetForm() {
if (this.recrecordmasterForm != null)
this.recrecordmasterForm.reset();
this.recrecordmasterForm.patchValue({
});
setTimeout(() => {
this.recrecordmasterservice.reclinkedrecords=[];
this.recrecordmasterservice.Insertreclinkedrecords=[];
this.reclinkedrecordsLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let recordid = this.recrecordmasterForm.get('recordid').value;
        if(recordid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.recrecordmasterservice.deleterecrecordmaster(recordid).then(res =>
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
    this.recrecordmasterForm.patchValue({
        recordid: null
    });
    if(this.recrecordmasterservice.formData.recordid!=null)this.recrecordmasterservice.formData.recordid=null;
for (let i=0;i<this.recrecordmasterservice.reclinkedrecords.length;i++) {
this.recrecordmasterservice.reclinkedrecords[i].linkedrecordid=null;
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
        else if(key=="recorddate")
this.recrecordmasterForm.patchValue({"recorddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="documentdate")
this.recrecordmasterForm.patchValue({"documentdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="metadata")
this.recrecordmasterForm.patchValue({"metadata":  mainscreendata[key] } );
        else if(key=="owner")
this.recrecordmasterForm.patchValue({"owner":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.recrecordmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.recrecordmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.recrecordmasterForm.controls[key]!=undefined)
{
this.recrecordmasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("recrecordmasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.recrecordmasterservice.formData.referencenumber!=null )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.recrecordmasterservice.formData.referencenumber!=null )
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
recordidonChange(evt:any){
let e=evt.value;
}
recorddateonChange(evt:any){
let e=evt.value;
}
typeonChange(evt:any){
let e=this.f.type.value as any;
this.recrecordmasterForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
referencenumberonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
folderidonChange(evt:any){
let e=evt.value;
this.recrecordmasterForm.patchValue({folderiddesc:evt.options[evt.options.selectedIndex].text});
}
documentreferenceonChange(evt:any){
let e=evt.value;
}
documenttitleonChange(evt:any){
let e=evt.value;
}
documentdateonChange(evt:any){
let e=evt.value;
}
languageonChange(evt:any){
let e=this.f.language.value as any;
this.recrecordmasterForm.patchValue({languagedesc:evt.options[evt.options.selectedIndex].text});
}
documenttypeonChange(evt:any){
let e=this.f.documenttype.value as any;
this.recrecordmasterForm.patchValue({documenttypedesc:evt.options[evt.options.selectedIndex].text});
}
documentgrouponChange(evt:any){
let e=this.f.documentgroup.value as any;
this.recrecordmasterForm.patchValue({documentgroupdesc:evt.options[evt.options.selectedIndex].text});
}
metadataonChange(evt:any){
let e=evt.value;
}
categoryonChange(evt:any){
let e=evt.value;
this.recrecordmasterForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res => this.subcategoryList = res as bosubcategorymaster[]);
});
}
subcategoryonChange(evt:any){
let e=evt.value;
this.recrecordmasterForm.patchValue({subcategorydesc:evt.options[evt.options.selectedIndex].text});
}
notesonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
owneronChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrowner=res;
let objowner;
if (arrowner.length > 0) objowner = arrowner[0];
if (objowner)
{
}
}).catch((err) => {console.log(err);});
}
customfieldonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
allcommentsonChange(evt:any){
let e=evt.value;
}
commentsonChange(evt:any){
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
  


editrecrecordmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.recrecordmasterservice.getrecrecordmastersByEID(pkcol).then(res => {

this.recrecordmasterservice.formData=res.recrecordmaster;
let formproperty=res.recrecordmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.recrecordmaster.pkcol;
this.formid=res.recrecordmaster.recordid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.recrecordmasterservice.formData=res.recrecordmaster;
this.formid=res.recrecordmaster.recordid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.recrecordmasterForm.patchValue({
recordid: res.recrecordmaster.recordid,
recorddate: this.ngbDateParserFormatter.parse(res.recrecordmaster.recorddate),
type: res.recrecordmaster.type,
typedesc: res.recrecordmaster.typedesc,
referencenumber: res.recrecordmaster.referencenumber,
description: res.recrecordmaster.description,
folderid: res.recrecordmaster.folderid,
folderiddesc: res.recrecordmaster.folderiddesc,
documentreference: res.recrecordmaster.documentreference,
documenttitle: res.recrecordmaster.documenttitle,
documentdate: this.ngbDateParserFormatter.parse(res.recrecordmaster.documentdate),
language: res.recrecordmaster.language,
languagedesc: res.recrecordmaster.languagedesc,
documenttype: res.recrecordmaster.documenttype,
documenttypedesc: res.recrecordmaster.documenttypedesc,
documentgroup: res.recrecordmaster.documentgroup,
documentgroupdesc: res.recrecordmaster.documentgroupdesc,
metadata: JSON.parse(res.recrecordmaster.metadata),
category: res.recrecordmaster.category,
categorydesc: res.recrecordmaster.categorydesc,
subcategory: res.recrecordmaster.subcategory,
subcategorydesc: res.recrecordmaster.subcategorydesc,
notes: res.recrecordmaster.notes,
remarks: res.recrecordmaster.remarks,
owner: JSON.parse(res.recrecordmaster.owner),
customfield: res.recrecordmaster.customfield,
attachment: JSON.parse(res.recrecordmaster.attachment),
allcomments: res.recrecordmaster.allcomments,
comments: res.recrecordmaster.comments,
status: res.recrecordmaster.status,
statusdesc: res.recrecordmaster.statusdesc,
});
this.reclinkedrecordsvisiblelist=res.reclinkedrecordsvisiblelist;
if(this.recrecordmasterForm.get('customfield').value!=null && this.recrecordmasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.recrecordmasterForm.get('customfield').value);
this.FillCustomField();
if(this.recrecordmasterForm.get('attachment').value!=null && this.recrecordmasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.recrecordmasterForm.get('attachment').value);
setTimeout(() => {
if(this.f.category.value && this.f.category.value!="" && this.f.category.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.category.value).then(res =>{
this.subcategoryList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.recrecordmasterservice.reclinkedrecords = res.reclinkedrecords;
this.SetreclinkedrecordsTableConfig();
this.reclinkedrecordsLoadTable();
  setTimeout(() => {
  this.SetreclinkedrecordsTableddConfig();
  });
this.recrecordmasterservice.Insertreclinkedrecords=[];
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
  for (let key in this.recrecordmasterForm.controls) {
    if (this.recrecordmasterForm.controls[key] != null) {
if(false)
{
if(this.recrecordmasterservice.formData!=null && this.recrecordmasterservice.formData[key]!=null  && this.recrecordmasterservice.formData[key]!='[]' && this.recrecordmasterservice.formData[key]!=undefined && this.recrecordmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.recrecordmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.recrecordmasterservice.formData!=null && this.recrecordmasterservice.formData[key]!=null   && this.recrecordmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.recrecordmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.recrecordmasterservice.formData!=null && this.recrecordmasterservice.formData[key]!=null   && this.recrecordmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.recrecordmasterservice.formData[key]+"'><div class='progress__number'>"+this.recrecordmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.recrecordmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.recrecordmasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.recrecordmasterForm.value;
obj.recorddate=new Date(this.recrecordmasterForm.get('recorddate').value ? this.ngbDateParserFormatter.format(this.recrecordmasterForm.get('recorddate').value)+'  UTC' :null);
obj.documentdate=new Date(this.recrecordmasterForm.get('documentdate').value ? this.ngbDateParserFormatter.format(this.recrecordmasterForm.get('documentdate').value)+'  UTC' :null);
if(this.recrecordmasterForm.get('metadata').value!=null)obj.metadata=JSON.stringify(this.recrecordmasterForm.get('metadata').value);
if(this.recrecordmasterForm.get('owner').value!=null)obj.owner=JSON.stringify(this.recrecordmasterForm.get('owner').value);
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

private recrecordmastertoggleOption(){
this.recrecordmastershowOption = this.recrecordmastershowOption === true ? false : true;
}

private reclinkedrecordtoggleOption(){
this.reclinkedrecordshowOption = this.reclinkedrecordshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.recrecordmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.recrecordmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.recrecordmasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.recrecordmasterservice.formData=this.recrecordmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.recrecordmasterForm.controls[key] != null)
    {
        this.recrecordmasterservice.formData[key] = this.recrecordmasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.recrecordmasterservice.formData.recorddate=new Date(this.recrecordmasterForm.get('recorddate').value ? this.ngbDateParserFormatter.format(this.recrecordmasterForm.get('recorddate').value)+'  UTC' :null);
this.recrecordmasterservice.formData.documentdate=new Date(this.recrecordmasterForm.get('documentdate').value ? this.ngbDateParserFormatter.format(this.recrecordmasterForm.get('documentdate').value)+'  UTC' :null);
if(this.recrecordmasterForm.get('metadata').value!=null)this.recrecordmasterservice.formData.metadata=JSON.stringify(this.recrecordmasterForm.get('metadata').value);
if(this.recrecordmasterForm.get('owner').value!=null)this.recrecordmasterservice.formData.owner=JSON.stringify(this.recrecordmasterForm.get('owner').value);
if(customfields!=null)this.recrecordmasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.recrecordmasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.recrecordmasterservice.formData.DeletedreclinkedrecordIDs = this.DeletedreclinkedrecordIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.recrecordmasterservice.formData);
this.recrecordmasterservice.formData=this.recrecordmasterForm.value;
this.recrecordmasterservice.saveOrUpdaterecrecordmasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.reclinkedrecordssource.data)
{
    for (let i = 0; i < this.reclinkedrecordssource.data.length; i++)
    {
        if (this.reclinkedrecordssource.data[i].fileattachmentlist)await this.sharedService.upload(this.reclinkedrecordssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).recrecordmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.recrecordmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).recrecordmaster);
}
else
{
this.FillData(res);
}
}
this.recrecordmasterForm.markAsUntouched();
this.recrecordmasterForm.markAsPristine();
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
this.dialog.open(recfolderComponent, 
{
data: {folderid:this.recrecordmasterForm.get('folderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.recrecordmasterForm.get('category').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubcategory( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.recrecordmasterForm.get('subcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes reclinkedrecords
onCustomreclinkedrecordsAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(recrecordmasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
reclinkedrecordssettings:any;
reclinkedrecordssource: any;

showreclinkedrecordsCheckbox()
{
debugger;
if(this.tblreclinkedrecordssource.settings['selectMode']== 'multi')this.tblreclinkedrecordssource.settings['selectMode']= 'single';
else
this.tblreclinkedrecordssource.settings['selectMode']= 'multi';
this.tblreclinkedrecordssource.initGrid();
}
deletereclinkedrecordsAll()
{
this.tblreclinkedrecordssource.settings['selectMode'] = 'single';
}
showreclinkedrecordsFilter()
{
  setTimeout(() => {
  this.SetreclinkedrecordsTableddConfig();
  });
      if(this.tblreclinkedrecordssource.settings!=null)this.tblreclinkedrecordssource.settings['hideSubHeader'] =!this.tblreclinkedrecordssource.settings['hideSubHeader'];
this.tblreclinkedrecordssource.initGrid();
}
showreclinkedrecordsInActive()
{
}
enablereclinkedrecordsInActive()
{
}
async SetreclinkedrecordsTableddConfig()
{
if(!this.bfilterPopulatereclinkedrecords){
}
this.bfilterPopulatereclinkedrecords=true;
}
async reclinkedrecordsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetreclinkedrecordsTableConfig()
{
this.reclinkedrecordssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
columnTitle:'',
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
linkedrecordid: {
title: 'Linked Record',
type: '',
},
recordid: {
title: 'Record',
type: '',
},
referencenumber: {
title: 'Referencenumber',
type: '',
},
description: {
title: 'Description',
type: '',
},
},
};
}
reclinkedrecordsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.reclinkedrecordsID)>=0)
{
this.reclinkedrecordssource=new LocalDataSource();
this.reclinkedrecordssource.load(this.recrecordmasterservice.reclinkedrecords as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblreclinkedrecordssource!=null)
{this.tblreclinkedrecordssource.grid.getRows().forEach((row:any) => {
if(row.data.linkedrecordid!=null && row.data.linkedrecordid!="")
{
this.recrecordmasterservice.Insertreclinkedrecords.push(row.data);
this.tblreclinkedrecordssource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
reclinkedrecordsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.recrecordmasterservice.reclinkedrecords.length == 0)
{
    this.tblreclinkedrecordssource.grid.createFormShown = true;
}
else
{
    let obj = new reclinkedrecord();
    this.recrecordmasterservice.reclinkedrecords.push(obj);
    this.reclinkedrecordssource.refresh();
    if ((this.recrecordmasterservice.reclinkedrecords.length / this.reclinkedrecordssource.getPaging().perPage).toFixed(0) + 1 != this.reclinkedrecordssource.getPaging().page)
    {
        this.reclinkedrecordssource.setPage((this.recrecordmasterservice.reclinkedrecords.length / this.reclinkedrecordssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblreclinkedrecordssource.grid.edit(this.tblreclinkedrecordssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.reclinkedrecordssource.data.indexOf(event.data);
this.onDeletereclinkedrecord(event,event.data.linkedrecordid,((this.reclinkedrecordssource.getPaging().page-1) *this.reclinkedrecordssource.getPaging().perPage)+index);
this.reclinkedrecordssource.refresh();
break;
}
}

*/
reclinkedrecordsPaging(val)
{
debugger;
this.reclinkedrecordssource.setPaging(1, val, true);
}

handlereclinkedrecordsGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.linkedrecordid==null || event.data.linkedrecordid=="")
{
var obj={fkrecordid:this.formid,recordid:event.data.recordid}
this.recrecordmasterservice.Insertreclinkedrecords.push(obj as any);
}
else
{
var deletedids=this.DeletedreclinkedrecordIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.linkedrecordid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.linkedrecordid!=null && event.data.linkedrecordid!="")this.DeletedreclinkedrecordIDs += event.data.linkedrecordid + ","; 
}
}
IsreclinkedrecordsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.reclinkedrecordsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes reclinkedrecords

}



