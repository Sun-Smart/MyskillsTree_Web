import { ltymerchantService } from './../../../service/ltymerchant.service';
import { ltymerchant } from './../../../model/ltymerchant.model';
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
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { ltymerchantproduct } from './../../../model/ltymerchantproduct.model';
import { ltymerchantproductComponent } from './../../../pages/forms/ltymerchantproduct/ltymerchantproduct.component';
//FK services
import { erpproduct,IerpproductResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpproduct.model';
import { erpproductComponent } from '../../../../../../n-tire-procurement-app/src/app/pages/forms/erpproduct/erpproduct.component';
import { erpproductService } from '../../../../../../n-tire-procurement-app/src/app/service/erpproduct.service';
import { ltystore } from './../../../model/ltystore.model';
import { ltystoreComponent } from './../../../pages/forms/ltystore/ltystore.component';
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
selector: 'app-ltymerchant',
templateUrl: './ltymerchant.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltymerchantComponent implements OnInit {
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
bfilterPopulateltymerchants:boolean=false;
dataltymerchantsbusinesscategory3:any=[];
dataltymerchantssegment3:any=[];
dataltymerchantsownershiptype3:any=[];
dataltymerchantsuserid3:any=[];
dataltymerchantproductsmerchantid3:any=[];
dataltymerchantproductsproductid3:any=[];
bfilterPopulateltymerchantproducts:boolean=false;
dataltystorescurrency3:any=[];
dataltystoresmerchantid3:any=[];
bfilterPopulateltystores:boolean=false;
@ViewChild('tblltymerchantproductssource',{static:false}) tblltymerchantproductssource: Ng2SmartTableComponent;
@ViewChild('tblltystoressource',{static:false}) tblltystoressource: Ng2SmartTableComponent;
 ltymerchantForm: FormGroup;
businesscategoryList: boconfigvalue[];
segmentList: boconfigvalue[];
ownershiptypeList: boconfigvalue[];
useridList: bousermaster[];
useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
userid_bousermastersForm: FormGroup;//autocomplete
userid_bousermastersoptions:any;//autocomplete
userid_bousermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
@ViewChild('idproof',{static:false}) idproof: AttachmentComponent;
SESSIONUSERID:any;//current user
sessiondata:any;
sourcekey:any;



ltymerchantproductsvisiblelist:any;
ltymerchantproductshidelist:any;
ltystoresvisiblelist:any;
ltystoreshidelist:any;

DeletedltymerchantproductIDs: string="";
ltymerchantproductsID: string = "1";
ltymerchantproductsselectedindex:any;
DeletedltystoreIDs: string="";
ltystoresID: string = "2";
ltystoresselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private ltymerchantservice: ltymerchantService,
private erpproductservice: erpproductService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
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
this.ltymerchantForm  = this.fb.group({
pk:[null],
merchantid: [null],
establishmentname: [null],
businesscategory: [null],
businesscategorydesc: [null],
segment: [null],
segmentdesc: [null],
legalname: [null],
incorporationdate: [null],
pannumber: [null],
website: [null],
contactperson: [null],
businessaddress: [null],
registeredaddress: [null],
phone: [null],
secondaryphone: [null],
email: [null],
ownershiptype: [null],
ownershiptypedesc: [null],
directors: [null],
idproof: [null],
turnover: [null],
bankaccount: [null],
bankname: [null],
city: [null],
branch: [null],
employees: [null],
vendors: [null],
officespace: [null],
funding: [null],
futureinvestments: [null],
venturecapitalistfunding: [null],
shareprice: [null],
userid: [null],
useriddesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.ltymerchantForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltymerchantForm.dirty && this.ltymerchantForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.merchantid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.merchantid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.merchantid && pkDetail) {
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

debugger;
let ltymerchantid = null;

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
//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
this.viewhtml=this.sessionService.getViewHtml();
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
this.formid=ltymerchantid;
//this.sharedService.alert(ltymerchantid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetltymerchantproductsTableConfig();
  setTimeout(() => {
  this.SetltymerchantproductsTableddConfig();
  });

this.SetltystoresTableConfig();
  setTimeout(() => {
  this.SetltystoresTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("businesscategory").then(res => this.businesscategoryList = res as boconfigvalue[]);
this.configservice.getList("customertype").then(res => this.segmentList = res as boconfigvalue[]);
this.configservice.getList("companytype").then(res => this.ownershiptypeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.useridList = res as bousermaster[];
if(this.ltymerchantservice.formData && this.ltymerchantservice.formData.userid){
this.useridoptionsEvent.emit(this.useridList);
this.ltymerchantForm.patchValue({
    userid: this.ltymerchantservice.formData.userid,
    useriddesc: this.ltymerchantservice.formData.useriddesc,
});
}
{
let arruserid = this.useridList.filter(v => v.userid == this.ltymerchantForm.get('userid').value);
let objuserid;
if (arruserid.length > 0) objuserid = arruserid[0];
if (objuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.userid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.useridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.userid_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.ltymerchantservice.getltymerchantsList().then(res => {
      this.pkList = res as ltymerchant[];
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
this.ltymerchantForm.markAsUntouched();
this.ltymerchantForm.markAsPristine();
}
onSelecteduserid(useridDetail: any) {
if (useridDetail.userid && useridDetail) {
this.ltymerchantForm.patchValue({
userid: useridDetail.userid,
useriddesc: useridDetail.username,

});

}
}




  getidproof() {
    debugger;
    if (this.idproof.getattachmentlist().length > 0) {
      let file = this.idproof.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.ltymerchantForm != null)
this.ltymerchantForm.reset();
this.ltymerchantForm.patchValue({
userid: this.sessiondata.userid,
useriddesc: this.sessiondata.username,
});
setTimeout(() => {
this.ltymerchantservice.ltymerchantproducts=[];
this.ltymerchantproductsLoadTable();
this.ltymerchantservice.ltystores=[];
this.ltystoresLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let merchantid = this.ltymerchantForm.get('merchantid').value;
        if(merchantid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltymerchantservice.deleteltymerchant(merchantid).then(res =>
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
    this.ltymerchantForm.patchValue({
        merchantid: null
    });
    if(this.ltymerchantservice.formData.merchantid!=null)this.ltymerchantservice.formData.merchantid=null;
for (let i=0;i<this.ltymerchantservice.ltymerchantproducts.length;i++) {
this.ltymerchantservice.ltymerchantproducts[i].merchantproductid=null;
}
for (let i=0;i<this.ltymerchantservice.ltystores.length;i++) {
this.ltymerchantservice.ltystores[i].storeid=null;
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
        else if(key=="incorporationdate")
this.ltymerchantForm.patchValue({"incorporationdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.ltymerchantForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltymerchantForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltymerchantForm.controls[key]!=undefined)this.ltymerchantForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true)
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
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
merchantidonChange(evt:any){
let e=evt.value;
}
establishmentnameonChange(evt:any){
let e=evt.value;
}
businesscategoryonChange(evt:any){
let e=this.f.businesscategory.value as any;
this.ltymerchantForm.patchValue({businesscategorydesc:evt.options[evt.options.selectedIndex].text});
}
segmentonChange(evt:any){
let e=this.f.segment.value as any;
this.ltymerchantForm.patchValue({segmentdesc:evt.options[evt.options.selectedIndex].text});
}
legalnameonChange(evt:any){
let e=evt.value;
}
incorporationdateonChange(evt:any){
let e=evt.value;
}
pannumberonChange(evt:any){
let e=evt.value;
}
websiteonChange(evt:any){
let e=evt.value;
}
contactpersononChange(evt:any){
let e=evt.value;
}
businessaddressonChange(evt:any){
let e=evt.value;
}
registeredaddressonChange(evt:any){
let e=evt.value;
}
phoneonChange(evt:any){
let e=evt.value;
}
secondaryphoneonChange(evt:any){
let e=evt.value;
}
emailonChange(evt:any){
let e=evt.value;
}
ownershiptypeonChange(evt:any){
let e=this.f.ownershiptype.value as any;
this.ltymerchantForm.patchValue({ownershiptypedesc:evt.options[evt.options.selectedIndex].text});
}
directorsonChange(evt:any){
let e=evt.value;
}
idproofonChange(evt:any){
let e=evt.value;
}
turnoveronChange(evt:any){
let e=evt.value;
}
bankaccountonChange(evt:any){
let e=evt.value;
}
banknameonChange(evt:any){
let e=evt.value;
}
cityonChange(evt:any){
let e=evt.value;
}
branchonChange(evt:any){
let e=evt.value;
}
employeesonChange(evt:any){
let e=evt.value;
}
vendorsonChange(evt:any){
let e=evt.value;
}
officespaceonChange(evt:any){
let e=evt.value;
}
fundingonChange(evt:any){
let e=evt.value;
}
futureinvestmentsonChange(evt:any){
let e=evt.value;
}
venturecapitalistfundingonChange(evt:any){
let e=evt.value;
}
sharepriceonChange(evt:any){
let e=evt.value;
}
useridonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.ltymerchantservice.getltymerchantsByEID(pkcol).then(res => {

this.ltymerchantservice.formData=res.ltymerchant;
let formproperty=res.ltymerchant.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltymerchant.pkcol;
this.formid=res.ltymerchant.merchantid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltymerchant.merchantid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltymerchantForm.patchValue({
merchantid: res.ltymerchant.merchantid,
establishmentname: res.ltymerchant.establishmentname,
businesscategory: res.ltymerchant.businesscategory,
businesscategorydesc: res.ltymerchant.businesscategorydesc,
segment: res.ltymerchant.segment,
segmentdesc: res.ltymerchant.segmentdesc,
legalname: res.ltymerchant.legalname,
incorporationdate: this.ngbDateParserFormatter.parse(res.ltymerchant.incorporationdate),
pannumber: res.ltymerchant.pannumber,
website: res.ltymerchant.website,
contactperson: res.ltymerchant.contactperson,
businessaddress: res.ltymerchant.businessaddress,
registeredaddress: res.ltymerchant.registeredaddress,
phone: res.ltymerchant.phone,
secondaryphone: res.ltymerchant.secondaryphone,
email: res.ltymerchant.email,
ownershiptype: res.ltymerchant.ownershiptype,
ownershiptypedesc: res.ltymerchant.ownershiptypedesc,
directors: res.ltymerchant.directors,
idproof: res.ltymerchant.idproof,
turnover: res.ltymerchant.turnover,
bankaccount: res.ltymerchant.bankaccount,
bankname: res.ltymerchant.bankname,
city: res.ltymerchant.city,
branch: res.ltymerchant.branch,
employees: res.ltymerchant.employees,
vendors: res.ltymerchant.vendors,
officespace: res.ltymerchant.officespace,
funding: res.ltymerchant.funding,
futureinvestments: res.ltymerchant.futureinvestments,
venturecapitalistfunding: res.ltymerchant.venturecapitalistfunding,
shareprice: res.ltymerchant.shareprice,
userid: res.ltymerchant.userid,
useriddesc: res.ltymerchant.useriddesc,
status: res.ltymerchant.status,
statusdesc: res.ltymerchant.statusdesc,
});
this.ltymerchantproductsvisiblelist=res.ltymerchantproductsvisiblelist;
this.ltystoresvisiblelist=res.ltystoresvisiblelist;
if(this.ltymerchantForm.get('idproof').value!=null && this.ltymerchantForm.get('idproof').value!="" && this.idproof!=null && this.idproof!=undefined)this.idproof.setattachmentlist(JSON.parse(this.ltymerchantForm.get('idproof').value));
//Child Tables if any
this.ltymerchantservice.ltymerchantproducts = res.ltymerchantproducts;
this.SetltymerchantproductsTableConfig();
this.ltymerchantproductsLoadTable();
  setTimeout(() => {
  this.SetltymerchantproductsTableddConfig();
  });
this.ltymerchantservice.ltystores = res.ltystores;
this.SetltystoresTableConfig();
this.ltystoresLoadTable();
  setTimeout(() => {
  this.SetltystoresTableddConfig();
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
  for (let key in this.ltymerchantForm.controls) {
    if (this.ltymerchantForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltymerchantForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltymerchantForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.ltymerchantForm.value;
obj.incorporationdate=new Date(this.ltymerchantForm.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.ltymerchantForm.get('incorporationdate').value)+'  UTC' :null);
console.log(obj);
await this.sharedService.upload(this.idproof.getAllFiles());
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.ltymerchantForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltymerchantForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltymerchantForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltymerchantservice.formData=this.ltymerchantForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltymerchantForm.controls[key] != null)
    {
        this.ltymerchantservice.formData[key] = this.ltymerchantForm.controls[key].value;
    }
}
}
}
this.ltymerchantservice.formData.incorporationdate=new Date(this.ltymerchantForm.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.ltymerchantForm.get('incorporationdate').value)+'  UTC' :null);
this.ltymerchantservice.formData.DeletedltymerchantproductIDs = this.DeletedltymerchantproductIDs;
this.ltymerchantservice.formData.DeletedltystoreIDs = this.DeletedltystoreIDs;
console.log(this.ltymerchantservice.formData);
this.ltymerchantservice.formData=this.ltymerchantForm.value;
this.ltymerchantservice.saveOrUpdateltymerchants().subscribe(
async res => {
await this.sharedService.upload(this.idproof.getAllFiles());
if (this.ltymerchantproductssource.data)
{
    for (let i = 0; i < this.ltymerchantproductssource.data.length; i++)
    {
        if (this.ltymerchantproductssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ltymerchantproductssource.data[i].fileattachmentlist);
    }
}
if (this.ltystoressource.data)
{
    for (let i = 0; i < this.ltystoressource.data.length; i++)
    {
        if (this.ltystoressource.data[i].fileattachmentlist)await this.sharedService.upload(this.ltystoressource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltymerchant);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltymerchantservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltymerchant);
}
else
{
this.FillData(res);
}
}
this.ltymerchantForm.markAsUntouched();
this.ltymerchantForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdituserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.ltymerchantForm.get('userid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditltymerchantproduct(event:any,merchantproductid:any, merchantid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(ltymerchantproductComponent, 
{
data:  {  showview:this.showview,save:false,event,merchantproductid, merchantid,visiblelist:this.ltymerchantproductsvisiblelist,  hidelist:this.ltymerchantproductshidelist,ScreenType:2  },
header: 'ltymerchantproducts'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.ltymerchantproductssource.add(res);
this.ltymerchantproductssource.refresh();
}
else
{
this.ltymerchantproductssource.update(event.data, res);
}
}
});
}

onDeleteltymerchantproduct(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedltymerchantproductIDs += childID + ",";
this.ltymerchantservice.ltymerchantproducts.splice(i, 1);
//this.updateGrandTotal();
}

onDeleteltystore(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedltystoreIDs += childID + ",";
this.ltymerchantservice.ltystores.splice(i, 1);
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes ltymerchantproducts
ltymerchantproductssettings:any;
ltymerchantproductssource: any;

showltymerchantproductsCheckbox()
{
debugger;
if(this.tblltymerchantproductssource.settings['selectMode']== 'multi')this.tblltymerchantproductssource.settings['selectMode']= 'single';
else
this.tblltymerchantproductssource.settings['selectMode']= 'multi';
this.tblltymerchantproductssource.initGrid();
}
deleteltymerchantproductsAll()
{
this.tblltymerchantproductssource.settings['selectMode'] = 'single';
}
showltymerchantproductsFilter()
{
  setTimeout(() => {
  this.SetltymerchantproductsTableddConfig();
  });
      if(this.tblltymerchantproductssource.settings!=null)this.tblltymerchantproductssource.settings['hideSubHeader'] =!this.tblltymerchantproductssource.settings['hideSubHeader'];
this.tblltymerchantproductssource.initGrid();
}
showltymerchantproductsInActive()
{
}
enableltymerchantproductsInActive()
{
}
async SetltymerchantproductsTableddConfig()
{
if(!this.bfilterPopulateltymerchantproducts){

this.ltymerchantservice.getltymerchantsList().then(res=>
{
var datamerchantid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataltymerchantproductsmerchantid3.push(defaultobj);
for(let i=0; i<datamerchantid2.length; i++){
var obj= { value: datamerchantid2[i].merchantid, title:datamerchantid2[i].establishmentname};
this.dataltymerchantproductsmerchantid3.push(obj);
}
if((this.tblltymerchantproductssource.settings as any).columns['merchantid'])
{
(this.tblltymerchantproductssource.settings as any).columns['merchantid'].editor.config.list=JSON.parse(JSON.stringify(this.dataltymerchantproductsmerchantid3));
this.tblltymerchantproductssource.initGrid();
}
});

this.erpproductservice.geterpproductsList().then(res=>
{
var dataproductid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataltymerchantproductsproductid3.push(defaultobj);
for(let i=0; i<dataproductid2.length; i++){
var obj= { value: dataproductid2[i].productid, title:dataproductid2[i].productname};
this.dataltymerchantproductsproductid3.push(obj);
}
if((this.tblltymerchantproductssource.settings as any).columns['productid'])
{
(this.tblltymerchantproductssource.settings as any).columns['productid'].editor.config.list=JSON.parse(JSON.stringify(this.dataltymerchantproductsproductid3));
this.tblltymerchantproductssource.initGrid();
}
});
}
this.bfilterPopulateltymerchantproducts=true;
}
async ltymerchantproductsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetltymerchantproductsTableConfig()
{
this.ltymerchantproductssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
productid: {
title: 'Product',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'cdsx8',reportcode:'cdsx8',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.dataltymerchantproductsproductid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
setupfee: {
title: 'Setup Fee',
type: 'number',
filter:true,
},
servicefee: {
title: 'Service Fee',
type: 'number',
filter:true,
},
pertransactionfee: {
title: 'Per Transaction Fee',
type: 'number',
filter:true,
},
},
};
}
ltymerchantproductsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltymerchantproductsID)>=0)
{
this.ltymerchantproductssource=new LocalDataSource();
this.ltymerchantproductssource.load(this.ltymerchantservice.ltymerchantproducts as  any as LocalDataSource);
this.ltymerchantproductssource.setPaging(1, 20, true);
}
}

//external to inline
/*
ltymerchantproductsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.ltymerchantservice.ltymerchantproducts.length == 0)
{
    this.tblltymerchantproductssource.grid.createFormShown = true;
}
else
{
    let obj = new ltymerchantproduct();
    this.ltymerchantservice.ltymerchantproducts.push(obj);
    this.ltymerchantproductssource.refresh();
    if ((this.ltymerchantservice.ltymerchantproducts.length / this.ltymerchantproductssource.getPaging().perPage).toFixed(0) + 1 != this.ltymerchantproductssource.getPaging().page)
    {
        this.ltymerchantproductssource.setPage((this.ltymerchantservice.ltymerchantproducts.length / this.ltymerchantproductssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblltymerchantproductssource.grid.edit(this.tblltymerchantproductssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ltymerchantproductssource.data.indexOf(event.data);
this.onDeleteltymerchantproduct(event,event.data.merchantproductid,((this.ltymerchantproductssource.getPaging().page-1) *this.ltymerchantproductssource.getPaging().perPage)+index);
this.ltymerchantproductssource.refresh();
break;
}
}

*/
ltymerchantproductsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditltymerchantproduct(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditltymerchantproduct(event,event.data.merchantproductid,this.formid);
break;
case 'delete':
this.onDeleteltymerchantproduct(event,event.data.merchantproductid,((this.ltymerchantproductssource.getPaging().page-1) *this.ltymerchantproductssource.getPaging().perPage)+event.index);
this.ltymerchantproductssource.refresh();
break;
}
}
ltymerchantproductsonDelete(obj) {
let merchantproductid=obj.data.merchantproductid;
if (confirm('Are you sure to delete this record ?')) {
this.ltymerchantservice.deleteltymerchant(merchantproductid).then(res=>
this.ltymerchantproductsLoadTable()
);
}
}
ltymerchantproductsPaging(val)
{
debugger;
this.ltymerchantproductssource.setPaging(1, val, true);
}

handleltymerchantproductsGridSelected(event:any) {
this.ltymerchantproductsselectedindex=this.ltymerchantservice.ltymerchantproducts.findIndex(i => i.merchantproductid === event.data.merchantproductid);
}
IsltymerchantproductsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltymerchantproductsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ltymerchantproducts
//start of Grid Codes ltystores
ltystoressettings:any;
ltystoressource: any;

showltystoresCheckbox()
{
debugger;
if(this.tblltystoressource.settings['selectMode']== 'multi')this.tblltystoressource.settings['selectMode']= 'single';
else
this.tblltystoressource.settings['selectMode']= 'multi';
this.tblltystoressource.initGrid();
}
deleteltystoresAll()
{
this.tblltystoressource.settings['selectMode'] = 'single';
}
showltystoresFilter()
{
  setTimeout(() => {
  this.SetltystoresTableddConfig();
  });
      if(this.tblltystoressource.settings!=null)this.tblltystoressource.settings['hideSubHeader'] =!this.tblltystoressource.settings['hideSubHeader'];
this.tblltystoressource.initGrid();
}
showltystoresInActive()
{
}
enableltystoresInActive()
{
}
async SetltystoresTableddConfig()
{
if(!this.bfilterPopulateltystores){
}
this.bfilterPopulateltystores=true;
}
async ltystoresbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetltystoresTableConfig()
{
this.ltystoressettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
add: !this.showview,
edit: !this.showview, // true,
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
name: {
title: 'Name',
type: '',
filter:true,
},
},
};
}
ltystoresLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltystoresID)>=0)
{
this.ltystoressource=new LocalDataSource();
this.ltystoressource.load(this.ltymerchantservice.ltystores as  any as LocalDataSource);
this.ltystoressource.setPaging(1, 20, true);
}
}
ltystoresroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.ltymerchantservice.ltystores.length == 0)
{
    this.tblltystoressource.grid.createFormShown = true;
}
else
{
    let obj = new ltystore();
    this.ltymerchantservice.ltystores.push(obj);
    this.ltystoressource.refresh();
    if ((this.ltymerchantservice.ltystores.length / this.ltystoressource.getPaging().perPage).toFixed(0) + 1 != this.ltystoressource.getPaging().page)
    {
        this.ltystoressource.setPage((this.ltymerchantservice.ltystores.length / this.ltystoressource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblltystoressource.grid.edit(this.tblltystoressource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ltystoressource.data.indexOf(event.data);
this.onDeleteltystore(event,event.data.storeid,((this.ltystoressource.getPaging().page-1) *this.ltystoressource.getPaging().perPage)+index);
this.ltystoressource.refresh();
break;
}
}
ltystoresPaging(val)
{
debugger;
this.ltystoressource.setPaging(1, val, true);
}

handleltystoresGridSelected(event:any) {
this.ltystoresselectedindex=this.ltymerchantservice.ltystores.findIndex(i => i.storeid === event.data.storeid);
}
IsltystoresVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltystoresID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ltystores

}



