import { lmscorporatesecondarycontactService } from './../../../service/lmscorporatesecondarycontact.service';
import { lmscorporatesecondarycontact } from './../../../model/lmscorporatesecondarycontact.model';
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
import { bouserbranchaccess} from '../../../../../../n-tire-bo-app/src/app/model/bouserbranchaccess.model';
import { bouserbranchaccessService } from '../../../../../../n-tire-bo-app/src/app/service/bouserbranchaccess.service';
//popups
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
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

@Component({
selector: 'app-lmscorporatesecondarycontact',
templateUrl: './lmscorporatesecondarycontact.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmscorporatesecondarycontactComponent implements OnInit {
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
bfilterPopulatelmscorporatesecondarycontacts:boolean=false;
datalmscorporatesecondarycontactsbranchid3:any=[];
datalmscorporatesecondarycontactsdesignation3:any=[];
datalmscorporatesecondarycontactscategory3:any=[];
datalmscorporatesecondarycontactsgroupname3:any=[];
 lmscorporatesecondarycontactForm: FormGroup;
branchidList: any[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bouserbranchaccessesForm: FormGroup;//autocomplete
branchid_bouserbranchaccessesoptions:any;//autocomplete
branchid_bouserbranchaccessesformatter:any;//autocomplete
designationList: bouserrolemaster[];
categoryList: boconfigvalue[];
groupnameList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
lmscorporatesecondarycontactshowOption:boolean;
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
private lmscorporatesecondarycontactservice: lmscorporatesecondarycontactService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserbranchaccessservice:bouserbranchaccessService,
private bouserrolemasterservice:bouserrolemasterService,
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
this.lmscorporatesecondarycontactForm  = this.fb.group({
pk:[null],
branchid: [null],
branchiddesc: [null],
leadid: [null],
secondarycontactid: [null],
firstname: [null],
lastname: [null],
companyname: [null],
designation: [null],
designationdesc: [null],
category: [null],
categorydesc: [null],
groupname: [null],
groupnamedesc: [null],
mobile: [null],
officephone: [null],
extension: [null],
residencephone: [null],
emailid: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmscorporatesecondarycontactForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmscorporatesecondarycontactForm.dirty && this.lmscorporatesecondarycontactForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.secondarycontactid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.secondarycontactid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.secondarycontactid && pkDetail) {
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
let lmscorporatesecondarycontactid = null;

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
this.formid=lmscorporatesecondarycontactid;
//this.sharedService.alert(lmscorporatesecondarycontactid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bouserbranchaccessservice.getbouserbranchaccessesList().then(res => 
{
this.branchidList = res as bouserbranchaccess[];
if(this.lmscorporatesecondarycontactservice.formData && this.lmscorporatesecondarycontactservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.lmscorporatesecondarycontactForm.patchValue({
    branchid: this.lmscorporatesecondarycontactservice.formData.branchid,
    branchiddesc: this.lmscorporatesecondarycontactservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.lmscorporatesecondarycontactForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bouserbranchaccessesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bouserbranchaccessesformatter = (result: any) => result.branchname;
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.designationList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("contactcategory").then(res => this.categoryList = res as boconfigvalue[]);
this.configservice.getList("contactgroup").then(res => this.groupnameList = res as boconfigvalue[]);

//autocomplete
    this.lmscorporatesecondarycontactservice.getlmscorporatesecondarycontactsList().then(res => {
      this.pkList = res as lmscorporatesecondarycontact[];
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
this.lmscorporatesecondarycontactForm.markAsUntouched();
this.lmscorporatesecondarycontactForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.lmscorporatesecondarycontactForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}




resetForm() {
if (this.lmscorporatesecondarycontactForm != null)
this.lmscorporatesecondarycontactForm.reset();
this.lmscorporatesecondarycontactForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let secondarycontactid = this.lmscorporatesecondarycontactForm.get('secondarycontactid').value;
        if(secondarycontactid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscorporatesecondarycontactservice.deletelmscorporatesecondarycontact(secondarycontactid).then(res =>
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
    this.lmscorporatesecondarycontactForm.patchValue({
        secondarycontactid: null
    });
    if(this.lmscorporatesecondarycontactservice.formData.secondarycontactid!=null)this.lmscorporatesecondarycontactservice.formData.secondarycontactid=null;
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
        else if(ctrltype=="string")
{
this.lmscorporatesecondarycontactForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmscorporatesecondarycontactForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmscorporatesecondarycontactForm.controls[key]!=undefined)
{
this.lmscorporatesecondarycontactForm.controls[key].disable({onlySelf: true});
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
leadidonChange(evt:any){
let e=evt.value;
}
secondarycontactidonChange(evt:any){
let e=evt.value;
}
firstnameonChange(evt:any){
let e=evt.value;
}
lastnameonChange(evt:any){
let e=evt.value;
}
companynameonChange(evt:any){
let e=evt.value;
}
designationonChange(evt:any){
let e=evt.value;
this.lmscorporatesecondarycontactForm.patchValue({designationdesc:evt.options[evt.options.selectedIndex].text});
}
categoryonChange(evt:any){
let e=this.f.category.value as any;
this.lmscorporatesecondarycontactForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}
groupnameonChange(evt:any){
let e=this.f.groupname.value as any;
this.lmscorporatesecondarycontactForm.patchValue({groupnamedesc:evt.options[evt.options.selectedIndex].text});
}
mobileonChange(evt:any){
let e=evt.value;
}
officephoneonChange(evt:any){
let e=evt.value;
}
extensiononChange(evt:any){
let e=evt.value;
}
residencephoneonChange(evt:any){
let e=evt.value;
}
emailidonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editlmscorporatesecondarycontacts() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmscorporatesecondarycontactservice.getlmscorporatesecondarycontactsByEID(pkcol).then(res => {

this.lmscorporatesecondarycontactservice.formData=res.lmscorporatesecondarycontact;
let formproperty=res.lmscorporatesecondarycontact.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmscorporatesecondarycontact.pkcol;
this.formid=res.lmscorporatesecondarycontact.secondarycontactid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmscorporatesecondarycontact.secondarycontactid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmscorporatesecondarycontactForm.patchValue({
branchid: res.lmscorporatesecondarycontact.branchid,
branchiddesc: res.lmscorporatesecondarycontact.branchiddesc,
leadid: res.lmscorporatesecondarycontact.leadid,
secondarycontactid: res.lmscorporatesecondarycontact.secondarycontactid,
firstname: res.lmscorporatesecondarycontact.firstname,
lastname: res.lmscorporatesecondarycontact.lastname,
companyname: res.lmscorporatesecondarycontact.companyname,
designation: res.lmscorporatesecondarycontact.designation,
designationdesc: res.lmscorporatesecondarycontact.designationdesc,
category: res.lmscorporatesecondarycontact.category,
categorydesc: res.lmscorporatesecondarycontact.categorydesc,
groupname: res.lmscorporatesecondarycontact.groupname,
groupnamedesc: res.lmscorporatesecondarycontact.groupnamedesc,
mobile: res.lmscorporatesecondarycontact.mobile,
officephone: res.lmscorporatesecondarycontact.officephone,
extension: res.lmscorporatesecondarycontact.extension,
residencephone: res.lmscorporatesecondarycontact.residencephone,
emailid: res.lmscorporatesecondarycontact.emailid,
status: res.lmscorporatesecondarycontact.status,
statusdesc: res.lmscorporatesecondarycontact.statusdesc,
});
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
  for (let key in this.lmscorporatesecondarycontactForm.controls) {
    if (this.lmscorporatesecondarycontactForm.controls[key] != null) {
if(false)
{
if(this.lmscorporatesecondarycontactservice.formData!=null && this.lmscorporatesecondarycontactservice.formData[key]!=null  && this.lmscorporatesecondarycontactservice.formData[key]!='[]' && this.lmscorporatesecondarycontactservice.formData[key]!=undefined && this.lmscorporatesecondarycontactservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmscorporatesecondarycontactservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmscorporatesecondarycontactservice.formData!=null && this.lmscorporatesecondarycontactservice.formData[key]!=null   && this.lmscorporatesecondarycontactservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmscorporatesecondarycontactservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmscorporatesecondarycontactservice.formData!=null && this.lmscorporatesecondarycontactservice.formData[key]!=null   && this.lmscorporatesecondarycontactservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmscorporatesecondarycontactservice.formData[key]+"'><div class='progress__number'>"+this.lmscorporatesecondarycontactservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmscorporatesecondarycontactForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmscorporatesecondarycontactForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.lmscorporatesecondarycontactForm.value;
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private lmscorporatesecondarycontacttoggleOption(){
this.lmscorporatesecondarycontactshowOption = this.lmscorporatesecondarycontactshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmscorporatesecondarycontactForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmscorporatesecondarycontactForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmscorporatesecondarycontactForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmscorporatesecondarycontactservice.formData=this.lmscorporatesecondarycontactForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmscorporatesecondarycontactForm.controls[key] != null)
    {
        this.lmscorporatesecondarycontactservice.formData[key] = this.lmscorporatesecondarycontactForm.controls[key].value;
    }
}
}
}
console.log(this.lmscorporatesecondarycontactservice.formData);
this.lmscorporatesecondarycontactservice.formData=this.lmscorporatesecondarycontactForm.value;
this.lmscorporatesecondarycontactservice.saveOrUpdatelmscorporatesecondarycontacts().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmscorporatesecondarycontact);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmscorporatesecondarycontactservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmscorporatesecondarycontact);
}
else
{
this.FillData(res);
}
}
this.lmscorporatesecondarycontactForm.markAsUntouched();
this.lmscorporatesecondarycontactForm.markAsPristine();
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
this.dialog.open(bouserbranchaccessComponent, 
{
data: {branchid:this.lmscorporatesecondarycontactForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdesignation( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.lmscorporatesecondarycontactForm.get('designation').value, ScreenType:2 }
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



