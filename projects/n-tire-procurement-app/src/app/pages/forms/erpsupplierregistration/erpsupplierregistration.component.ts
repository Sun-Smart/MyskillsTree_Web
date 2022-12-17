import { erpsupplierregistrationService } from './../../../service/erpsupplierregistration.service';
import { erpsupplierregistration } from './../../../model/erpsupplierregistration.model';
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
import { bocountry} from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocountry/bocountry.component';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
//popups
import { bostate} from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.component';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
//popups
import { bocity} from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.component';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
//popups
//detail table services
import { erpregisteredsupplierproductcategory } from './../../../model/erpregisteredsupplierproductcategory.model';
import { erpregisteredsupplierproductcategoryComponent } from './../../../pages/forms/erpregisteredsupplierproductcategory/erpregisteredsupplierproductcategory.component';
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
selector: 'app-erpsupplierregistration',
templateUrl: './erpsupplierregistration.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsupplierregistrationComponent implements OnInit {
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
bfilterPopulateerpsupplierregistrations:boolean=false;
dataerpsupplierregistrationssuppliertype3:any=[];
dataerpsupplierregistrationslanguage3:any=[];
dataerpsupplierregistrationscountryid3:any=[];
dataerpsupplierregistrationsstateid3:any=[];
dataerpsupplierregistrationscityid3:any=[];
dataerpsupplierregistrationscreditcardtype3:any=[];
dataerpsupplierregistrationsexpirymonth3:any=[];
dataerpsupplierregistrationsexpiryyear3:any=[];
dataerpsupplierregistrationsstatus3:any=[];
dataerpregisteredsupplierproductcategoriesproductcategory3:any=[];
dataerpregisteredsupplierproductcategoriesregistrationid3:any=[];
bfilterPopulateerpregisteredsupplierproductcategories:boolean=false;
@ViewChild('tblerpregisteredsupplierproductcategoriessource',{static:false}) tblerpregisteredsupplierproductcategoriessource: Ng2SmartTableComponent;
 erpsupplierregistrationForm: FormGroup;
suppliertypeList: boconfigvalue[];
languageList: boconfigvalue[];
countryidList: bocountry[];
countryidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
countryid_bocountriesForm: FormGroup;//autocomplete
countryid_bocountriesoptions:any;//autocomplete
countryid_bocountriesformatter:any;//autocomplete
stateidList: bostate[];
stateidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
stateid_bostatesForm: FormGroup;//autocomplete
stateid_bostatesoptions:any;//autocomplete
stateid_bostatesformatter:any;//autocomplete
cityidList: bocity[];
cityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
cityid_bocitiesForm: FormGroup;//autocomplete
cityid_bocitiesoptions:any;//autocomplete
cityid_bocitiesformatter:any;//autocomplete
creditcardtypeList: boconfigvalue[];
expirymonthList: boconfigvalue[];
expiryyearList: boconfigvalue[];
statusList: boconfigvalue[];
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
@ViewChild('licensefile',{static:false}) licensefile: AttachmentComponent;
@ViewChild('taxfile',{static:false}) taxfile: AttachmentComponent;
SESSIONUSERID:any;//current user
erpsupplierregistrationshowOption:boolean;
erpregisteredsupplierproductcategoryshowOption:boolean;
sessiondata:any;
sourcekey:any;

detailsvisible:boolean = false;
isyourcompanyvisible:boolean = false;
typeofbusinessvisible:boolean = false;


erpregisteredsupplierproductcategoriesvisiblelist:any;
erpregisteredsupplierproductcategorieshidelist:any;

DeletederpregisteredsupplierproductcategoryIDs: string="";
erpregisteredsupplierproductcategoriesID: string = "1";
erpregisteredsupplierproductcategoriesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpsupplierregistrationservice: erpsupplierregistrationService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bocountryservice:bocountryService,
private bostateservice:bostateService,
private bocityservice:bocityService,
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
this.erpsupplierregistrationForm  = this.fb.group({
pk:[null],
ImageName: [null],
registrationid: [null],
name: [null],
registrationdate: [null],
licensed: [null],
licensenumber: [null],
licensefile: [null],
taxregistrationnumber: [null],
taxfile: [null],
companydetails: [null],
contactperson: [null],
designation: [null],
cpmobile: [null],
cpemail: [null],
establishmentyear: [null],
email: [null],
password: [null],
suppliertype: [null],
suppliertypedesc: [null],
language: [null],
languagedesc: [null],
address1: [null],
address2: [null],
countryid: [null],
countryiddesc: [null],
stateid: [null],
stateiddesc: [null],
cityid: [null],
cityiddesc: [null],
pin: [null],
directline: [null],
extension: [null],
website: [null],
telephone: [null],
products: [null],
services: [null],
servicelocations: [null],
insured: [null],
bonded: [null],
remarks: [null],
customfield: [null],
attachment: [null],
creditcardtype: [null],
creditcardtypedesc: [null],
creditcardnumber: [null],
expirymonth: [null],
expirymonthdesc: [null],
expiryyear: [null],
expiryyeardesc: [null],
cvv: [null],
registrationamount: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpsupplierregistrationForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsupplierregistrationForm.dirty && this.erpsupplierregistrationForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.registrationid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.registrationid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.registrationid && pkDetail) {
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
let erpsupplierregistrationid = null;

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
this.formid=erpsupplierregistrationid;
//this.sharedService.alert(erpsupplierregistrationid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpregisteredsupplierproductcategoriesTableConfig();
  setTimeout(() => {
  this.SeterpregisteredsupplierproductcategoriesTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("suppliertype").then(res => this.suppliertypeList = res as boconfigvalue[]);
this.configservice.getList("language").then(res => this.languageList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.erpsupplierregistrationservice.formData && this.erpsupplierregistrationservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.erpsupplierregistrationForm.patchValue({
    countryid: this.erpsupplierregistrationservice.formData.countryid,
    countryiddesc: this.erpsupplierregistrationservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.erpsupplierregistrationForm.get('countryid').value);
let objcountryid;
if (arrcountryid.length > 0) objcountryid = arrcountryid[0];
if (objcountryid)
{
}
}
}
).catch((err) => {console.log(err);});
this.countryid_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.countryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.countryid_bocountriesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.countryid.value && this.f.countryid.value!="" && this.f.countryid.value!=null)this.bostateservice.getListBycountryid(this.f.countryid.value).then(res =>{
this.stateidList = res as bostate[];
if(this.erpsupplierregistrationservice.formData && this.erpsupplierregistrationservice.formData.stateid){this.erpsupplierregistrationForm.patchValue({
    stateid: this.erpsupplierregistrationservice.formData.stateid,
    stateiddesc: this.erpsupplierregistrationservice.formData.stateiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.stateid_bostatesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.stateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.stateid_bostatesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.stateid.value && this.f.stateid.value!="" && this.f.stateid.value!=null)this.bocityservice.getListBystateid(this.f.stateid.value).then(res =>{
this.cityidList = res as bocity[];
if(this.erpsupplierregistrationservice.formData && this.erpsupplierregistrationservice.formData.cityid){this.erpsupplierregistrationForm.patchValue({
    cityid: this.erpsupplierregistrationservice.formData.cityid,
    cityiddesc: this.erpsupplierregistrationservice.formData.cityiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.cityid_bocitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.cityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.cityid_bocitiesformatter = (result: any) => result.name;
this.configservice.getList("creditcardtype").then(res => this.creditcardtypeList = res as boconfigvalue[]);
this.configservice.getList("expirymonth").then(res => this.expirymonthList = res as boconfigvalue[]);
this.configservice.getList("expiryyear").then(res => this.expiryyearList = res as boconfigvalue[]);
this.configservice.getList("status").then(res => this.statusList = res as boconfigvalue[]);

//autocomplete
    this.erpsupplierregistrationservice.geterpsupplierregistrationsList().then(res => {
      this.pkList = res as erpsupplierregistration[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.name;

//setting the flag that the screen is not touched 
this.erpsupplierregistrationForm.markAsUntouched();
this.erpsupplierregistrationForm.markAsPristine();
}
onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.erpsupplierregistrationForm.patchValue({
countryid: countryidDetail.countryid,
countryiddesc: countryidDetail.name,

});
this.bostateservice.getListBycountryid(countryidDetail.countryid).then(res => {
 this.stateidList = res as bostate[]
}).catch((err) => {console.log(err);});

}
}

onSelectedstateid(stateidDetail: any) {
if (stateidDetail.stateid && stateidDetail) {
this.erpsupplierregistrationForm.patchValue({
stateid: stateidDetail.stateid,
stateiddesc: stateidDetail.name,

});
this.bocityservice.getListBystateid(stateidDetail.stateid).then(res => {
 this.cityidList = res as bocity[]
}).catch((err) => {console.log(err);});

}
}

onSelectedcityid(cityidDetail: any) {
if (cityidDetail.cityid && cityidDetail) {
this.erpsupplierregistrationForm.patchValue({
cityid: cityidDetail.cityid,
cityiddesc: cityidDetail.name,

});

}
}




  getlicensefile() {
    debugger;
    if (this.licensefile.getattachmentlist().length > 0) {
      let file = this.licensefile.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
  gettaxfile() {
    debugger;
    if (this.taxfile.getattachmentlist().length > 0) {
      let file = this.taxfile.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.erpsupplierregistrationForm != null)
this.erpsupplierregistrationForm.reset();
this.erpsupplierregistrationForm.patchValue({
});
setTimeout(() => {
this.erpsupplierregistrationservice.erpregisteredsupplierproductcategories=[];
this.erpregisteredsupplierproductcategoriesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.detailsvisible = false;
this.isyourcompanyvisible = false;
this.typeofbusinessvisible = false;
}

    onDelete() {
        let registrationid = this.erpsupplierregistrationForm.get('registrationid').value;
        if(registrationid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsupplierregistrationservice.deleteerpsupplierregistration(registrationid).then(res =>
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
    this.erpsupplierregistrationForm.patchValue({
        registrationid: null
    });
    if(this.erpsupplierregistrationservice.formData.registrationid!=null)this.erpsupplierregistrationservice.formData.registrationid=null;
for (let i=0;i<this.erpsupplierregistrationservice.erpregisteredsupplierproductcategories.length;i++) {
this.erpsupplierregistrationservice.erpregisteredsupplierproductcategories[i].supplierproductcategoryid=null;
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
        else if(key=="registrationdate")
this.erpsupplierregistrationForm.patchValue({"registrationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="servicelocations")
this.erpsupplierregistrationForm.patchValue({"servicelocations":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.erpsupplierregistrationForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsupplierregistrationForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsupplierregistrationForm.controls[key]!=undefined)
{
this.erpsupplierregistrationForm.controls[key].disable({onlySelf: true});
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
return this.customfieldservice.getcustomfieldconfigurationsByTable("erpsupplierregistrations",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


}
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true  || this.erpsupplierregistrationservice.formData.name!=null )
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
registrationidonChange(evt:any){
let e=evt.value;
}
nameonChange(evt:any){
let e=evt.value;
}
registrationdateonChange(evt:any){
let e=evt.value;
}
licensedonChange(evt:any){
let e=evt.value;
}
licensenumberonChange(evt:any){
let e=evt.value;
}
licensefileonChange(evt:any){
let e=evt.value;
}
taxregistrationnumberonChange(evt:any){
let e=evt.value;
}
taxfileonChange(evt:any){
let e=evt.value;
}
companydetailsonChange(evt:any){
let e=evt.value;
}
contactpersononChange(evt:any){
let e=evt.value;
}
designationonChange(evt:any){
let e=evt.value;
}
cpmobileonChange(evt:any){
let e=evt.value;
}
cpemailonChange(evt:any){
let e=evt.value;
}
establishmentyearonChange(evt:any){
let e=evt.value;
}
emailonChange(evt:any){
let e=evt.value;
}
passwordonChange(evt:any){
let e=evt.value;
}
suppliertypeonChange(evt:any){
let e=this.f.suppliertype.value as any;
this.erpsupplierregistrationForm.patchValue({suppliertypedesc:evt.options[evt.options.selectedIndex].text});
}
languageonChange(evt:any){
let e=this.f.language.value as any;
this.erpsupplierregistrationForm.patchValue({languagedesc:evt.options[evt.options.selectedIndex].text});
}
address1onChange(evt:any){
let e=evt.value;
}
address2onChange(evt:any){
let e=evt.value;
}
countryidonChange(evt:any){
let e=evt.value;
}
stateidonChange(evt:any){
let e=evt.value;
}
cityidonChange(evt:any){
let e=evt.value;
}
pinonChange(evt:any){
let e=evt.value;
}
directlineonChange(evt:any){
let e=evt.value;
}
extensiononChange(evt:any){
let e=evt.value;
}
websiteonChange(evt:any){
let e=evt.value;
}
telephoneonChange(evt:any){
let e=evt.value;
}
productsonChange(evt:any){
let e=evt.value;
}
servicesonChange(evt:any){
let e=evt.value;
}
servicelocationsonChange(evt:any){
let e=evt.value;
}
insuredonChange(evt:any){
let e=evt.value;
}
bondedonChange(evt:any){
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
creditcardtypeonChange(evt:any){
let e=this.f.creditcardtype.value as any;
this.erpsupplierregistrationForm.patchValue({creditcardtypedesc:evt.options[evt.options.selectedIndex].text});
}
creditcardnumberonChange(evt:any){
let e=evt.value;
}
expirymonthonChange(evt:any){
let e=this.f.expirymonth.value as any;
this.erpsupplierregistrationForm.patchValue({expirymonthdesc:evt.options[evt.options.selectedIndex].text});
}
expiryyearonChange(evt:any){
let e=this.f.expiryyear.value as any;
this.erpsupplierregistrationForm.patchValue({expiryyeardesc:evt.options[evt.options.selectedIndex].text});
}
cvvonChange(evt:any){
let e=evt.value;
}
registrationamountonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=this.f.status.value as any;
this.typeofbusinessvisible=false;
if(this.f.status.value == 'QS')this.typeofbusinessvisible=true;
this.erpsupplierregistrationForm.patchValue({statusdesc:evt.options[evt.options.selectedIndex].text});
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
  


editerpsupplierregistrations() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsupplierregistrationservice.geterpsupplierregistrationsByEID(pkcol).then(res => {

this.erpsupplierregistrationservice.formData=res.erpsupplierregistration;
let formproperty=res.erpsupplierregistration.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsupplierregistration.pkcol;
this.formid=res.erpsupplierregistration.registrationid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsupplierregistration.registrationid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsupplierregistrationForm.patchValue({
registrationid: res.erpsupplierregistration.registrationid,
name: res.erpsupplierregistration.name,
registrationdate: this.ngbDateParserFormatter.parse(res.erpsupplierregistration.registrationdate),
licensed: res.erpsupplierregistration.licensed,
licensenumber: res.erpsupplierregistration.licensenumber,
licensefile: JSON.parse(res.erpsupplierregistration.licensefile),
taxregistrationnumber: res.erpsupplierregistration.taxregistrationnumber,
taxfile: JSON.parse(res.erpsupplierregistration.taxfile),
companydetails: res.erpsupplierregistration.companydetails,
contactperson: res.erpsupplierregistration.contactperson,
designation: res.erpsupplierregistration.designation,
cpmobile: res.erpsupplierregistration.cpmobile,
cpemail: res.erpsupplierregistration.cpemail,
establishmentyear: res.erpsupplierregistration.establishmentyear,
email: res.erpsupplierregistration.email,
password: res.erpsupplierregistration.password,
suppliertype: res.erpsupplierregistration.suppliertype,
suppliertypedesc: res.erpsupplierregistration.suppliertypedesc,
language: res.erpsupplierregistration.language,
languagedesc: res.erpsupplierregistration.languagedesc,
address1: res.erpsupplierregistration.address1,
address2: res.erpsupplierregistration.address2,
countryid: res.erpsupplierregistration.countryid,
countryiddesc: res.erpsupplierregistration.countryiddesc,
stateid: res.erpsupplierregistration.stateid,
stateiddesc: res.erpsupplierregistration.stateiddesc,
cityid: res.erpsupplierregistration.cityid,
cityiddesc: res.erpsupplierregistration.cityiddesc,
pin: res.erpsupplierregistration.pin,
directline: res.erpsupplierregistration.directline,
extension: res.erpsupplierregistration.extension,
website: res.erpsupplierregistration.website,
telephone: res.erpsupplierregistration.telephone,
products: res.erpsupplierregistration.products,
services: res.erpsupplierregistration.services,
servicelocations: JSON.parse(res.erpsupplierregistration.servicelocations),
insured: res.erpsupplierregistration.insured,
bonded: res.erpsupplierregistration.bonded,
remarks: res.erpsupplierregistration.remarks,
customfield: res.erpsupplierregistration.customfield,
attachment: JSON.parse(res.erpsupplierregistration.attachment),
creditcardtype: res.erpsupplierregistration.creditcardtype,
creditcardtypedesc: res.erpsupplierregistration.creditcardtypedesc,
creditcardnumber: res.erpsupplierregistration.creditcardnumber,
expirymonth: res.erpsupplierregistration.expirymonth,
expirymonthdesc: res.erpsupplierregistration.expirymonthdesc,
expiryyear: res.erpsupplierregistration.expiryyear,
expiryyeardesc: res.erpsupplierregistration.expiryyeardesc,
cvv: res.erpsupplierregistration.cvv,
registrationamount: res.erpsupplierregistration.registrationamount,
status: res.erpsupplierregistration.status,
statusdesc: res.erpsupplierregistration.statusdesc,
});
//hide list
if(res.visiblelist!=undefined && res.visiblelist.indexOf("details")>=0)this.detailsvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("details")>=0)this.detailsvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("isyourcompany")>=0)this.isyourcompanyvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("isyourcompany")>=0)this.isyourcompanyvisible = false;
if(res.visiblelist!=undefined && res.visiblelist.indexOf("typeofbusiness")>=0)this.typeofbusinessvisible = true;
if(res.hidelist!=undefined && res.hidelist.indexOf("typeofbusiness")>=0)this.typeofbusinessvisible = false;
this.erpregisteredsupplierproductcategoriesvisiblelist=res.erpregisteredsupplierproductcategoriesvisiblelist;
if(this.erpsupplierregistrationForm.get('customfield').value!=null && this.erpsupplierregistrationForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.erpsupplierregistrationForm.get('customfield').value);
this.FillCustomField();
if(this.erpsupplierregistrationForm.get('licensefile').value!=null && this.erpsupplierregistrationForm.get('licensefile').value!="" && this.licensefile!=null && this.licensefile!=undefined)this.licensefile.setattachmentlist(this.erpsupplierregistrationForm.get('licensefile').value);
if(this.erpsupplierregistrationForm.get('taxfile').value!=null && this.erpsupplierregistrationForm.get('taxfile').value!="" && this.taxfile!=null && this.taxfile!=undefined)this.taxfile.setattachmentlist(this.erpsupplierregistrationForm.get('taxfile').value);
if(this.erpsupplierregistrationForm.get('attachment').value!=null && this.erpsupplierregistrationForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.erpsupplierregistrationForm.get('attachment').value);
setTimeout(() => {
if(this.f.countryid.value && this.f.countryid.value!="" && this.f.countryid.value!=null)this.bostateservice.getListBycountryid(this.f.countryid.value).then(res =>{
this.stateidList = res as bostate[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.stateid.value && this.f.stateid.value!="" && this.f.stateid.value!=null)this.bocityservice.getListBystateid(this.f.stateid.value).then(res =>{
this.cityidList = res as bocity[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.erpsupplierregistrationservice.erpregisteredsupplierproductcategories = res.erpregisteredsupplierproductcategories;
this.SeterpregisteredsupplierproductcategoriesTableConfig();
this.erpregisteredsupplierproductcategoriesLoadTable();
  setTimeout(() => {
  this.SeterpregisteredsupplierproductcategoriesTableddConfig();
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
  for (let key in this.erpsupplierregistrationForm.controls) {
    if (this.erpsupplierregistrationForm.controls[key] != null) {
if( key=="licensefile" ||  key=="taxfile")
{
if(this.erpsupplierregistrationservice.formData!=null && this.erpsupplierregistrationservice.formData[key]!=null  && this.erpsupplierregistrationservice.formData[key]!='[]' && this.erpsupplierregistrationservice.formData[key]!=undefined && this.erpsupplierregistrationservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsupplierregistrationservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsupplierregistrationservice.formData!=null && this.erpsupplierregistrationservice.formData[key]!=null   && this.erpsupplierregistrationservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsupplierregistrationservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsupplierregistrationservice.formData!=null && this.erpsupplierregistrationservice.formData[key]!=null   && this.erpsupplierregistrationservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsupplierregistrationservice.formData[key]+"'><div class='progress__number'>"+this.erpsupplierregistrationservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplierregistrationForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsupplierregistrationForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.erpsupplierregistrationForm.value;
obj.registrationdate=new Date(this.erpsupplierregistrationForm.get('registrationdate').value ? this.ngbDateParserFormatter.format(this.erpsupplierregistrationForm.get('registrationdate').value)+'  UTC' :null);
if(this.erpsupplierregistrationForm.get('servicelocations').value!=null)obj.servicelocations=JSON.stringify(this.erpsupplierregistrationForm.get('servicelocations').value);
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.licensefile.getattachmentlist()!=null)obj.licensefile=JSON.stringify(this.licensefile.getattachmentlist());
if(this.licensefile.getattachmentlist()!=null)obj.licensefile=JSON.stringify(this.licensefile.getattachmentlist());
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
await this.sharedService.upload(this.licensefile.getAllFiles());
await this.sharedService.upload(this.taxfile.getAllFiles());
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

private erpsupplierregistrationtoggleOption(){
this.erpsupplierregistrationshowOption = this.erpsupplierregistrationshowOption === true ? false : true;
}

private erpregisteredsupplierproductcategorytoggleOption(){
this.erpregisteredsupplierproductcategoryshowOption = this.erpregisteredsupplierproductcategoryshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsupplierregistrationForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsupplierregistrationForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsupplierregistrationForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsupplierregistrationservice.formData=this.erpsupplierregistrationForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsupplierregistrationForm.controls[key] != null)
    {
        this.erpsupplierregistrationservice.formData[key] = this.erpsupplierregistrationForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.erpsupplierregistrationservice.formData.registrationdate=new Date(this.erpsupplierregistrationForm.get('registrationdate').value ? this.ngbDateParserFormatter.format(this.erpsupplierregistrationForm.get('registrationdate').value)+'  UTC' :null);
this.erpsupplierregistrationservice.formData.licensefile=this.erpsupplierregistrationForm.get('licensefile').value;
this.erpsupplierregistrationservice.formData.taxfile=this.erpsupplierregistrationForm.get('taxfile').value;
if(this.erpsupplierregistrationForm.get('servicelocations').value!=null)this.erpsupplierregistrationservice.formData.servicelocations=JSON.stringify(this.erpsupplierregistrationForm.get('servicelocations').value);
if(customfields!=null)this.erpsupplierregistrationservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.erpsupplierregistrationservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.erpsupplierregistrationservice.formData.DeletederpregisteredsupplierproductcategoryIDs = this.DeletederpregisteredsupplierproductcategoryIDs;
if(this.licensefile.getattachmentlist()!=null)this.erpsupplierregistrationservice.formData.licensefile=JSON.stringify(this.licensefile.getattachmentlist());
if(this.licensefile.getattachmentlist()!=null)this.erpsupplierregistrationservice.formData.licensefile=JSON.stringify(this.licensefile.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.erpsupplierregistrationservice.formData);
this.erpsupplierregistrationservice.formData=this.erpsupplierregistrationForm.value;
this.erpsupplierregistrationservice.saveOrUpdateerpsupplierregistrations().subscribe(
async res => {
await this.sharedService.upload(this.licensefile.getAllFiles());
await this.sharedService.upload(this.taxfile.getAllFiles());
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.erpregisteredsupplierproductcategoriessource.data)
{
    for (let i = 0; i < this.erpregisteredsupplierproductcategoriessource.data.length; i++)
    {
        if (this.erpregisteredsupplierproductcategoriessource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpregisteredsupplierproductcategoriessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierregistration);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsupplierregistrationservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierregistration);
}
else
{
this.FillData(res);
}
}
this.erpsupplierregistrationForm.markAsUntouched();
this.erpsupplierregistrationForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.erpsupplierregistrationForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.erpsupplierregistrationForm.get('stateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.erpsupplierregistrationForm.get('cityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpregisteredsupplierproductcategory(event:any,supplierproductcategoryid:any, registrationid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpregisteredsupplierproductcategoryComponent, 
{
data:  {  showview:false,save:false,event,supplierproductcategoryid, registrationid,visiblelist:this.erpregisteredsupplierproductcategoriesvisiblelist,  hidelist:this.erpregisteredsupplierproductcategorieshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpregisteredsupplierproductcategoriessource.add(res);
this.erpregisteredsupplierproductcategoriessource.refresh();
}
else
{
this.erpregisteredsupplierproductcategoriessource.update(event.data, res);
}
}
});
}

onDeleteerpregisteredsupplierproductcategory(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpregisteredsupplierproductcategoryIDs += childID + ",";
this.erpsupplierregistrationservice.erpregisteredsupplierproductcategories.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpregisteredsupplierproductcategories
erpregisteredsupplierproductcategoriessettings:any;
erpregisteredsupplierproductcategoriessource: any;

showerpregisteredsupplierproductcategoriesCheckbox()
{
debugger;
if(this.tblerpregisteredsupplierproductcategoriessource.settings['selectMode']== 'multi')this.tblerpregisteredsupplierproductcategoriessource.settings['selectMode']= 'single';
else
this.tblerpregisteredsupplierproductcategoriessource.settings['selectMode']= 'multi';
this.tblerpregisteredsupplierproductcategoriessource.initGrid();
}
deleteerpregisteredsupplierproductcategoriesAll()
{
this.tblerpregisteredsupplierproductcategoriessource.settings['selectMode'] = 'single';
}
showerpregisteredsupplierproductcategoriesFilter()
{
  setTimeout(() => {
  this.SeterpregisteredsupplierproductcategoriesTableddConfig();
  });
      if(this.tblerpregisteredsupplierproductcategoriessource.settings!=null)this.tblerpregisteredsupplierproductcategoriessource.settings['hideSubHeader'] =!this.tblerpregisteredsupplierproductcategoriessource.settings['hideSubHeader'];
this.tblerpregisteredsupplierproductcategoriessource.initGrid();
}
showerpregisteredsupplierproductcategoriesInActive()
{
}
enableerpregisteredsupplierproductcategoriesInActive()
{
}
async SeterpregisteredsupplierproductcategoriesTableddConfig()
{
if(!this.bfilterPopulateerpregisteredsupplierproductcategories){
}
this.bfilterPopulateerpregisteredsupplierproductcategories=true;
}
async erpregisteredsupplierproductcategoriesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpregisteredsupplierproductcategoriesTableConfig()
{
this.erpregisteredsupplierproductcategoriessettings = {
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
productcategory: {
title: 'Product Category',
type: '',
filter:true,
},
},
};
}
erpregisteredsupplierproductcategoriesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpregisteredsupplierproductcategoriesID)>=0)
{
this.erpregisteredsupplierproductcategoriessource=new LocalDataSource();
this.erpregisteredsupplierproductcategoriessource.load(this.erpsupplierregistrationservice.erpregisteredsupplierproductcategories as  any as LocalDataSource);
this.erpregisteredsupplierproductcategoriessource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpregisteredsupplierproductcategoriesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsupplierregistrationservice.erpregisteredsupplierproductcategories.length == 0)
{
    this.tblerpregisteredsupplierproductcategoriessource.grid.createFormShown = true;
}
else
{
    let obj = new erpregisteredsupplierproductcategory();
    this.erpsupplierregistrationservice.erpregisteredsupplierproductcategories.push(obj);
    this.erpregisteredsupplierproductcategoriessource.refresh();
    if ((this.erpsupplierregistrationservice.erpregisteredsupplierproductcategories.length / this.erpregisteredsupplierproductcategoriessource.getPaging().perPage).toFixed(0) + 1 != this.erpregisteredsupplierproductcategoriessource.getPaging().page)
    {
        this.erpregisteredsupplierproductcategoriessource.setPage((this.erpsupplierregistrationservice.erpregisteredsupplierproductcategories.length / this.erpregisteredsupplierproductcategoriessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpregisteredsupplierproductcategoriessource.grid.edit(this.tblerpregisteredsupplierproductcategoriessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpregisteredsupplierproductcategoriessource.data.indexOf(event.data);
this.onDeleteerpregisteredsupplierproductcategory(event,event.data.supplierproductcategoryid,((this.erpregisteredsupplierproductcategoriessource.getPaging().page-1) *this.erpregisteredsupplierproductcategoriessource.getPaging().perPage)+index);
this.erpregisteredsupplierproductcategoriessource.refresh();
break;
}
}

*/
erpregisteredsupplierproductcategoriesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpregisteredsupplierproductcategory(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpregisteredsupplierproductcategory(event,event.data.supplierproductcategoryid,this.formid);
break;
case 'delete':
this.onDeleteerpregisteredsupplierproductcategory(event,event.data.supplierproductcategoryid,((this.erpregisteredsupplierproductcategoriessource.getPaging().page-1) *this.erpregisteredsupplierproductcategoriessource.getPaging().perPage)+event.index);
this.erpregisteredsupplierproductcategoriessource.refresh();
break;
}
}
erpregisteredsupplierproductcategoriesonDelete(obj) {
let supplierproductcategoryid=obj.data.supplierproductcategoryid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsupplierregistrationservice.deleteerpsupplierregistration(supplierproductcategoryid).then(res=>
this.erpregisteredsupplierproductcategoriesLoadTable()
);
}
}
erpregisteredsupplierproductcategoriesPaging(val)
{
debugger;
this.erpregisteredsupplierproductcategoriessource.setPaging(1, val, true);
}

handleerpregisteredsupplierproductcategoriesGridSelected(event:any) {
this.erpregisteredsupplierproductcategoriesselectedindex=this.erpsupplierregistrationservice.erpregisteredsupplierproductcategories.findIndex(i => i.supplierproductcategoryid === event.data.supplierproductcategoryid);
}
IserpregisteredsupplierproductcategoriesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpregisteredsupplierproductcategoriesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpregisteredsupplierproductcategories

}



