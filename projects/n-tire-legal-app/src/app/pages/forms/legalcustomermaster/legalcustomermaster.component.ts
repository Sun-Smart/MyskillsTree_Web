import { legalcustomermasterService } from './../../../service/legalcustomermaster.service';
import { legalcustomermaster } from './../../../model/legalcustomermaster.model';
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
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bosubcategorymaster} from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
//popups
//detail table services
import { bocontact } from '../../../../../../n-tire-bo-app/src/app/model/bocontact.model';
import { bocontactComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocontact/bocontact.component';
//FK services
import { legalopponentmaster } from './../../../model/legalopponentmaster.model';
import { legalopponentmasterComponent } from './../../../pages/forms/legalopponentmaster/legalopponentmaster.component';
//FK services
import { bostate,IbostateResponse } from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.component';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
import { bocountry,IbocountryResponse } from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocountry/bocountry.component';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
import { bocity,IbocityResponse } from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.component';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
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
selector: 'app-legalcustomermaster',
templateUrl: './legalcustomermaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalcustomermasterComponent implements OnInit {
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
bfilterPopulatelegalcustomermasters:boolean=false;
datalegalcustomermastersbranchid3:any=[];
datalegalcustomermasterscustomertypeid3:any=[];
datalegalcustomermasterscategoryid3:any=[];
datalegalcustomermasterssubcategoryid3:any=[];
datalegalcustomermastersgroupname3:any=[];
databocontactscategory3:any=[];
databocontactscontacttype3:any=[];
databocontactsreferencetype3:any=[];
bfilterPopulatebocontacts:boolean=false;
datalegalopponentmastersstateid3:any=[];
datalegalopponentmasterscountryid3:any=[];
datalegalopponentmasterscityid3:any=[];
bfilterPopulatelegalopponentmasters:boolean=false;
@ViewChild('tblbocontactssource',{static:false}) tblbocontactssource: Ng2SmartTableComponent;
@ViewChild('tbllegalopponentmasterssource',{static:false}) tbllegalopponentmasterssource: Ng2SmartTableComponent;
 legalcustomermasterForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
customertypeidList: bomasterdata[];
categoryidList: bomasterdata[];
subcategoryidList: bosubcategorymaster[];
groupnameList: boconfigvalue[];
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
legalcustomermastershowOption:boolean;
bocontactshowOption:boolean;
legalopponentmastershowOption:boolean;
sessiondata:any;
sourcekey:any;



bocontactsvisiblelist:any;
bocontactshidelist:any;
legalopponentmastersvisiblelist:any;
legalopponentmastershidelist:any;

DeletedbocontactIDs: string="";
bocontactsID: string = "1";
bocontactsselectedindex:any;
DeletedlegalopponentmasterIDs: string="";
legalopponentmastersID: string = "2";
legalopponentmastersselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private legalcustomermasterservice: legalcustomermasterService,
private bostateservice: bostateService,
private bocountryservice: bocountryService,
private bocityservice: bocityService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
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
this.legalcustomermasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
branchid: [null],
branchiddesc: [null],
customerid: [null],
customercode: [null, Validators.required],
customername: [null, Validators.required],
thumbnail: [null],
customertypeid: [null],
customertypeiddesc: [null],
categoryid: [null],
categoryiddesc: [null],
subcategoryid: [null],
subcategoryiddesc: [null],
groupname: [null],
groupnamedesc: [null],
website: [null],
phone: [null],
mobilenumber: [null, Validators.required],
emailid: [null, Validators.required],
address: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalcustomermasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalcustomermasterForm.dirty && this.legalcustomermasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
branchidexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.branchid.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].customerid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Branch value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}
customercodeexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.customercode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].customerid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Customer Code value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}
mobilenumberexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.mobilenumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].customerid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Mobile Number value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}
customernameexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.customername.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].customerid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Customer Name value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}
emailidexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.emailid.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].customerid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Email value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}

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
  let pos = this.pkList.map(function(e:any) { return e.customerid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.customerid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.customerid && pkDetail) {
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
let legalcustomermasterid = null;

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
this.formid=legalcustomermasterid;
//this.sharedService.alert(legalcustomermasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbocontactsTableConfig();
  setTimeout(() => {
  this.SetbocontactsTableddConfig();
  });

this.SetlegalopponentmastersTableConfig();
  setTimeout(() => {
  this.SetlegalopponentmastersTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.legalcustomermasterservice.formData && this.legalcustomermasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.legalcustomermasterForm.patchValue({
    branchid: this.legalcustomermasterservice.formData.branchid,
    branchiddesc: this.legalcustomermasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.legalcustomermasterForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bobranchmastersformatter = (result: any) => result.branchname;
this.bomasterdataservice.getList("m7j9j").then(res => {
this.customertypeidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("enra5").then(res => {
this.categoryidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
if(this.legalcustomermasterservice.formData && this.legalcustomermasterservice.formData.subcategoryid){this.legalcustomermasterForm.patchValue({
    subcategoryid: this.legalcustomermasterservice.formData.subcategoryid,
    subcategoryiddesc: this.legalcustomermasterservice.formData.subcategoryiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.configservice.getList("companygroup").then(res => this.groupnameList = res as boconfigvalue[]);

//autocomplete
    this.legalcustomermasterservice.getlegalcustomermastersList().then(res => {
      this.pkList = res as legalcustomermaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.customername.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.customername;

//setting the flag that the screen is not touched 
this.legalcustomermasterForm.markAsUntouched();
this.legalcustomermasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.legalcustomermasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}




resetForm() {
if (this.legalcustomermasterForm != null)
this.legalcustomermasterForm.reset();
this.legalcustomermasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
setTimeout(() => {
this.legalcustomermasterservice.bocontacts=[];
this.bocontactsLoadTable();
this.legalcustomermasterservice.legalopponentmasters=[];
this.legalopponentmastersLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let customerid = this.legalcustomermasterForm.get('customerid').value;
        if(customerid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalcustomermasterservice.deletelegalcustomermaster(customerid).then(res =>
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
    this.legalcustomermasterForm.patchValue({
        customerid: null
    });
    if(this.legalcustomermasterservice.formData.customerid!=null)this.legalcustomermasterservice.formData.customerid=null;
for (let i=0;i<this.legalcustomermasterservice.bocontacts.length;i++) {
this.legalcustomermasterservice.bocontacts[i].contactid=null;
}
for (let i=0;i<this.legalcustomermasterservice.legalopponentmasters.length;i++) {
this.legalcustomermasterservice.legalopponentmasters[i].opponentid=null;
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
        else if(key=="address")
this.legalcustomermasterForm.patchValue({"address":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.legalcustomermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcustomermasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcustomermasterForm.controls[key]!=undefined)
{
this.legalcustomermasterForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("legalcustomermasters",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.legalcustomermasterservice.formData.customername!=null )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.legalcustomermasterservice.formData.customername!=null )
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
branchidonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
customercodeonChange(evt:any){
let e=evt.value;
}
customernameonChange(evt:any){
let e=evt.value;
}
thumbnailonChange(evt:any){
let e=evt.value;
}
customertypeidonChange(evt:any){
let e=evt.value;
this.legalcustomermasterForm.patchValue({customertypeiddesc:evt.options[evt.options.selectedIndex].text});
}
categoryidonChange(evt:any){
let e=evt.value;
this.legalcustomermasterForm.patchValue({categoryiddesc:evt.options[evt.options.selectedIndex].text});
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res => this.subcategoryidList = res as bosubcategorymaster[]);
});
}
subcategoryidonChange(evt:any){
let e=evt.value;
this.legalcustomermasterForm.patchValue({subcategoryiddesc:evt.options[evt.options.selectedIndex].text});
}
groupnameonChange(evt:any){
let e=this.f.groupname.value as any;
this.legalcustomermasterForm.patchValue({groupnamedesc:evt.options[evt.options.selectedIndex].text});
}
websiteonChange(evt:any){
let e=evt.value;
}
phoneonChange(evt:any){
let e=evt.value;
}
mobilenumberonChange(evt:any){
let e=evt.value;
}
emailidonChange(evt:any){
let e=evt.value;
}
addressonChange(evt:any){
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
  


editlegalcustomermasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalcustomermasterservice.getlegalcustomermastersByEID(pkcol).then(res => {

this.legalcustomermasterservice.formData=res.legalcustomermaster;
let formproperty=res.legalcustomermaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalcustomermaster.pkcol;
this.formid=res.legalcustomermaster.customerid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalcustomermasterservice.formData=res.legalcustomermaster;
this.formid=res.legalcustomermaster.customerid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalcustomermasterForm.patchValue({
branchid: res.legalcustomermaster.branchid,
branchiddesc: res.legalcustomermaster.branchiddesc,
customerid: res.legalcustomermaster.customerid,
customercode: res.legalcustomermaster.customercode,
customername: res.legalcustomermaster.customername,
thumbnail: res.legalcustomermaster.thumbnail,
customertypeid: res.legalcustomermaster.customertypeid,
customertypeiddesc: res.legalcustomermaster.customertypeiddesc,
categoryid: res.legalcustomermaster.categoryid,
categoryiddesc: res.legalcustomermaster.categoryiddesc,
subcategoryid: res.legalcustomermaster.subcategoryid,
subcategoryiddesc: res.legalcustomermaster.subcategoryiddesc,
groupname: res.legalcustomermaster.groupname,
groupnamedesc: res.legalcustomermaster.groupnamedesc,
website: res.legalcustomermaster.website,
phone: res.legalcustomermaster.phone,
mobilenumber: res.legalcustomermaster.mobilenumber,
emailid: res.legalcustomermaster.emailid,
address: JSON.parse(res.legalcustomermaster.address),
customfield: res.legalcustomermaster.customfield,
attachment: JSON.parse(res.legalcustomermaster.attachment),
status: res.legalcustomermaster.status,
statusdesc: res.legalcustomermaster.statusdesc,
});
this.bocontactsvisiblelist=res.bocontactsvisiblelist;
this.legalopponentmastersvisiblelist=res.legalopponentmastersvisiblelist;
if(this.legalcustomermasterForm.get('customfield').value!=null && this.legalcustomermasterForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.legalcustomermasterForm.get('customfield').value);
this.FillCustomField();
if(this.legalcustomermasterForm.get('attachment').value!=null && this.legalcustomermasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legalcustomermasterForm.get('attachment').value);
setTimeout(() => {
if(this.f.categoryid.value && this.f.categoryid.value!="" && this.f.categoryid.value!=null)this.bosubcategorymasterservice.getListBycategoryid(this.f.categoryid.value).then(res =>{
this.subcategoryidList = res as bosubcategorymaster[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.legalcustomermasterservice.bocontacts = res.bocontacts;
this.SetbocontactsTableConfig();
this.bocontactsLoadTable();
  setTimeout(() => {
  this.SetbocontactsTableddConfig();
  });
this.legalcustomermasterservice.legalopponentmasters = res.legalopponentmasters;
this.SetlegalopponentmastersTableConfig();
this.legalopponentmastersLoadTable();
  setTimeout(() => {
  this.SetlegalopponentmastersTableddConfig();
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
  for (let key in this.legalcustomermasterForm.controls) {
    if (this.legalcustomermasterForm.controls[key] != null) {
if(false)
{
if(this.legalcustomermasterservice.formData!=null && this.legalcustomermasterservice.formData[key]!=null  && this.legalcustomermasterservice.formData[key]!='[]' && this.legalcustomermasterservice.formData[key]!=undefined && this.legalcustomermasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcustomermasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalcustomermasterservice.formData!=null && this.legalcustomermasterservice.formData[key]!=null   && this.legalcustomermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalcustomermasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalcustomermasterservice.formData!=null && this.legalcustomermasterservice.formData[key]!=null   && this.legalcustomermasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalcustomermasterservice.formData[key]+"'><div class='progress__number'>"+this.legalcustomermasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcustomermasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalcustomermasterForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.legalcustomermasterForm.value;
if(this.legalcustomermasterForm.get('address').value!=null)obj.address=JSON.stringify(this.legalcustomermasterForm.get('address').value);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private legalcustomermastertoggleOption(){
this.legalcustomermastershowOption = this.legalcustomermastershowOption === true ? false : true;
}

private bocontacttoggleOption(){
this.bocontactshowOption = this.bocontactshowOption === true ? false : true;
}

private legalopponentmastertoggleOption(){
this.legalopponentmastershowOption = this.legalopponentmastershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcustomermasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcustomermasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcustomermasterForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalcustomermasterservice.formData=this.legalcustomermasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcustomermasterForm.controls[key] != null)
    {
        this.legalcustomermasterservice.formData[key] = this.legalcustomermasterForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
if(this.legalcustomermasterForm.get('address').value!=null)this.legalcustomermasterservice.formData.address=JSON.stringify(this.legalcustomermasterForm.get('address').value);
if(customfields!=null)this.legalcustomermasterservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.legalcustomermasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.legalcustomermasterservice.formData.DeletedbocontactIDs = this.DeletedbocontactIDs;
this.legalcustomermasterservice.formData.DeletedlegalopponentmasterIDs = this.DeletedlegalopponentmasterIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legalcustomermasterservice.formData);
this.legalcustomermasterservice.formData=this.legalcustomermasterForm.value;
this.legalcustomermasterservice.saveOrUpdatelegalcustomermasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.bocontactssource.data)
{
    for (let i = 0; i < this.bocontactssource.data.length; i++)
    {
        if (this.bocontactssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bocontactssource.data[i].fileattachmentlist);
    }
}
if (this.legalopponentmasterssource.data)
{
    for (let i = 0; i < this.legalopponentmasterssource.data.length; i++)
    {
        if (this.legalopponentmasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalopponentmasterssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcustomermaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalcustomermasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcustomermaster);
}
else
{
this.FillData(res);
}
}
this.legalcustomermasterForm.markAsUntouched();
this.legalcustomermasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.legalcustomermasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcustomertypeid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalcustomermasterForm.get('customertypeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcategoryid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalcustomermasterForm.get('categoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsubcategoryid( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.legalcustomermasterForm.get('subcategoryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbocontact(event:any,contactid:any, customerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bocontactComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,contactid, customerid,visiblelist:this.bocontactsvisiblelist,  hidelist:this.bocontactshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bocontactssource.add(res);
this.bocontactssource.refresh();
}
else
{
this.bocontactssource.update(event.data, res);
}
}
});
}

onDeletebocontact(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbocontactIDs += childID + ",";
this.legalcustomermasterservice.bocontacts.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditlegalopponentmaster(event:any,opponentid:any, customerid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalopponentmasterComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,opponentid, customerid,visiblelist:this.legalopponentmastersvisiblelist,  hidelist:this.legalopponentmastershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalopponentmasterssource.add(res);
this.legalopponentmasterssource.refresh();
}
else
{
this.legalopponentmasterssource.update(event.data, res);
}
}
});
}

onDeletelegalopponentmaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalopponentmasterIDs += childID + ",";
this.legalcustomermasterservice.legalopponentmasters.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bocontacts
bocontactssettings:any;
bocontactssource: any;

showbocontactsCheckbox()
{
debugger;
if(this.tblbocontactssource.settings['selectMode']== 'multi')this.tblbocontactssource.settings['selectMode']= 'single';
else
this.tblbocontactssource.settings['selectMode']= 'multi';
this.tblbocontactssource.initGrid();
}
deletebocontactsAll()
{
this.tblbocontactssource.settings['selectMode'] = 'single';
}
showbocontactsFilter()
{
  setTimeout(() => {
  this.SetbocontactsTableddConfig();
  });
      if(this.tblbocontactssource.settings!=null)this.tblbocontactssource.settings['hideSubHeader'] =!this.tblbocontactssource.settings['hideSubHeader'];
this.tblbocontactssource.initGrid();
}
showbocontactsInActive()
{
}
enablebocontactsInActive()
{
}
async SetbocontactsTableddConfig()
{
if(!this.bfilterPopulatebocontacts){
}
this.bfilterPopulatebocontacts=true;
}
async bocontactsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbocontactsTableConfig()
{
this.bocontactssettings = {
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
lastname: {
title: 'Last Name',
type: '',
filter:true,
},
},
};
}
bocontactsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bocontactsID)>=0)
{
this.bocontactssource=new LocalDataSource();
this.bocontactssource.load(this.legalcustomermasterservice.bocontacts as  any as LocalDataSource);
this.bocontactssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bocontactsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcustomermasterservice.bocontacts.length == 0)
{
    this.tblbocontactssource.grid.createFormShown = true;
}
else
{
    let obj = new bocontact();
    this.legalcustomermasterservice.bocontacts.push(obj);
    this.bocontactssource.refresh();
    if ((this.legalcustomermasterservice.bocontacts.length / this.bocontactssource.getPaging().perPage).toFixed(0) + 1 != this.bocontactssource.getPaging().page)
    {
        this.bocontactssource.setPage((this.legalcustomermasterservice.bocontacts.length / this.bocontactssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbocontactssource.grid.edit(this.tblbocontactssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.bocontactssource.data.indexOf(event.data);
this.onDeletebocontact(event,event.data.contactid,((this.bocontactssource.getPaging().page-1) *this.bocontactssource.getPaging().perPage)+index);
this.bocontactssource.refresh();
}
break;
}
}

*/
bocontactsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbocontact(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbocontact(event,event.data.contactid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeletebocontact(event,event.data.contactid,((this.bocontactssource.getPaging().page-1) *this.bocontactssource.getPaging().perPage)+event.index);
this.bocontactssource.refresh();
}
break;
}
}
bocontactsonDelete(obj) {
let contactid=obj.data.contactid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcustomermasterservice.deletelegalcustomermaster(contactid).then(res=>
this.bocontactsLoadTable()
);
}
}
bocontactsPaging(val)
{
debugger;
this.bocontactssource.setPaging(1, val, true);
}

handlebocontactsGridSelected(event:any) {
this.bocontactsselectedindex=this.legalcustomermasterservice.bocontacts.findIndex(i => i.contactid === event.data.contactid);
}
IsbocontactsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bocontactsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bocontacts
//start of Grid Codes legalopponentmasters
legalopponentmasterssettings:any;
legalopponentmasterssource: any;

showlegalopponentmastersCheckbox()
{
debugger;
if(this.tbllegalopponentmasterssource.settings['selectMode']== 'multi')this.tbllegalopponentmasterssource.settings['selectMode']= 'single';
else
this.tbllegalopponentmasterssource.settings['selectMode']= 'multi';
this.tbllegalopponentmasterssource.initGrid();
}
deletelegalopponentmastersAll()
{
this.tbllegalopponentmasterssource.settings['selectMode'] = 'single';
}
showlegalopponentmastersFilter()
{
  setTimeout(() => {
  this.SetlegalopponentmastersTableddConfig();
  });
      if(this.tbllegalopponentmasterssource.settings!=null)this.tbllegalopponentmasterssource.settings['hideSubHeader'] =!this.tbllegalopponentmasterssource.settings['hideSubHeader'];
this.tbllegalopponentmasterssource.initGrid();
}
showlegalopponentmastersInActive()
{
}
enablelegalopponentmastersInActive()
{
}
async SetlegalopponentmastersTableddConfig()
{
if(!this.bfilterPopulatelegalopponentmasters){
}
this.bfilterPopulatelegalopponentmasters=true;
}
async legalopponentmastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalopponentmastersTableConfig()
{
this.legalopponentmasterssettings = {
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
opponentname: {
title: 'Opponent Name',
type: '',
filter:true,
},
mobilenumber: {
title: 'Mobile Number',
type: '',
filter:true,
},
emailid: {
title: 'Email',
type: '',
filter:true,
},
address1: {
title: 'Address1',
type: '',
filter:true,
},
address2: {
title: 'Address2',
type: '',
filter:true,
},
countryid: {
title: 'Country',
type: 'number',
filter:true,
},
stateid: {
title: 'State',
type: 'number',
filter:true,
},
cityid: {
title: 'City',
type: 'number',
filter:true,
},
pin: {
title: 'P I N',
type: '',
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
legalopponentmastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalopponentmastersID)>=0)
{
this.legalopponentmasterssource=new LocalDataSource();
this.legalopponentmasterssource.load(this.legalcustomermasterservice.legalopponentmasters as  any as LocalDataSource);
this.legalopponentmasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalopponentmastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcustomermasterservice.legalopponentmasters.length == 0)
{
    this.tbllegalopponentmasterssource.grid.createFormShown = true;
}
else
{
    let obj = new legalopponentmaster();
    this.legalcustomermasterservice.legalopponentmasters.push(obj);
    this.legalopponentmasterssource.refresh();
    if ((this.legalcustomermasterservice.legalopponentmasters.length / this.legalopponentmasterssource.getPaging().perPage).toFixed(0) + 1 != this.legalopponentmasterssource.getPaging().page)
    {
        this.legalopponentmasterssource.setPage((this.legalcustomermasterservice.legalopponentmasters.length / this.legalopponentmasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalopponentmasterssource.grid.edit(this.tbllegalopponentmasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalopponentmasterssource.data.indexOf(event.data);
this.onDeletelegalopponentmaster(event,event.data.opponentid,((this.legalopponentmasterssource.getPaging().page-1) *this.legalopponentmasterssource.getPaging().perPage)+index);
this.legalopponentmasterssource.refresh();
break;
}
}

*/
legalopponentmastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalopponentmaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalopponentmaster(event,event.data.opponentid,this.formid);
break;
case 'delete':
this.onDeletelegalopponentmaster(event,event.data.opponentid,((this.legalopponentmasterssource.getPaging().page-1) *this.legalopponentmasterssource.getPaging().perPage)+event.index);
this.legalopponentmasterssource.refresh();
break;
}
}
legalopponentmastersonDelete(obj) {
let opponentid=obj.data.opponentid;
if (confirm('Are you sure to delete this record ?')) {
this.legalcustomermasterservice.deletelegalcustomermaster(opponentid).then(res=>
this.legalopponentmastersLoadTable()
);
}
}
legalopponentmastersPaging(val)
{
debugger;
this.legalopponentmasterssource.setPaging(1, val, true);
}

handlelegalopponentmastersGridSelected(event:any) {
this.legalopponentmastersselectedindex=this.legalcustomermasterservice.legalopponentmasters.findIndex(i => i.opponentid === event.data.opponentid);
}
IslegalopponentmastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalopponentmastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalopponentmasters

}



