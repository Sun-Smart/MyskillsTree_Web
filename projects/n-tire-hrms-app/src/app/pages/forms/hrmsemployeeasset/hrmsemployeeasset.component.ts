import { hrmsemployeeassetService } from './../../../service/hrmsemployeeasset.service';
import { hrmsemployeeasset } from './../../../model/hrmsemployeeasset.model';
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
import { hrmsemployee} from './../../../model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
//popups
import { camsassetmaster} from '../../../../../../n-tire-cams-app/src/app/model/camsassetmaster.model';
import { camsassetmasterService } from '../../../../../../n-tire-cams-app/src/app/service/camsassetmaster.service';
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
selector: 'app-hrmsemployeeasset',
templateUrl: './hrmsemployeeasset.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeeassetComponent implements OnInit {
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
bfilterPopulatehrmsemployeeassets:boolean=false;
datahrmsemployeeassetsemployeeid3:any=[];
datahrmsemployeeassetsassetid3:any=[];
 hrmsemployeeassetForm: FormGroup;
employeeidList: hrmsemployee[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_hrmsemployeesForm: FormGroup;//autocomplete
employeeid_hrmsemployeesoptions:any;//autocomplete
employeeid_hrmsemployeesformatter:any;//autocomplete
assetidList: camsassetmaster[];
assetidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assetid_camsassetmastersForm: FormGroup;//autocomplete
assetid_camsassetmastersoptions:any;//autocomplete
assetid_camsassetmastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsemployeeassetshowOption:boolean;
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
private hrmsemployeeassetservice: hrmsemployeeassetService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsemployeeservice:hrmsemployeeService,
private camsassetmasterservice:camsassetmasterService,
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
this.hrmsemployeeassetForm  = this.fb.group({
pk:[null],
employeeid: [null],
employeeiddesc: [null],
employeeassetid: [null],
assetid: [null],
assetiddesc: [null],
assetcode: [null],
assetname: [null],
assetcheckoutdate: [null],
checkedin: [null],
assetcheckindate: [null],
description: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeeassetForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeeassetForm.dirty && this.hrmsemployeeassetForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.employeeassetid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.employeeassetid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.employeeassetid && pkDetail) {
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
let hrmsemployeeassetid = null;

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
this.formid=hrmsemployeeassetid;
//this.sharedService.alert(hrmsemployeeassetid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.employeeidList = res as hrmsemployee[];
if(this.hrmsemployeeassetservice.formData && this.hrmsemployeeassetservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsemployeeassetForm.patchValue({
    employeeid: this.hrmsemployeeassetservice.formData.employeeid,
    employeeiddesc: this.hrmsemployeeassetservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.employeeid == this.hrmsemployeeassetForm.get('employeeid').value);
let objemployeeid;
if (arremployeeid.length > 0) objemployeeid = arremployeeid[0];
if (objemployeeid)
{
}
}
}
).catch((err) => {console.log(err);});
this.employeeid_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.employeeidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.employeeid_hrmsemployeesformatter = (result: any) => result.employeename;
this.camsassetmasterservice.getcamsassetmastersList().then(res => 
{
this.assetidList = res as camsassetmaster[];
if(this.hrmsemployeeassetservice.formData && this.hrmsemployeeassetservice.formData.assetid){
this.assetidoptionsEvent.emit(this.assetidList);
this.hrmsemployeeassetForm.patchValue({
    assetid: this.hrmsemployeeassetservice.formData.assetid,
    assetiddesc: this.hrmsemployeeassetservice.formData.assetiddesc,
});
}
{
let arrassetid = this.assetidList.filter(v => v.assetid == this.hrmsemployeeassetForm.get('assetid').value);
let objassetid;
if (arrassetid.length > 0) objassetid = arrassetid[0];
if (objassetid)
{
    this.hrmsemployeeassetForm.patchValue({ reference: objassetid.assetcode });
    this.hrmsemployeeassetForm.patchValue({ description: objassetid.assetname });
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

//autocomplete
    this.hrmsemployeeassetservice.gethrmsemployeeassetsList().then(res => {
      this.pkList = res as hrmsemployeeasset[];
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
this.hrmsemployeeassetForm.markAsUntouched();
this.hrmsemployeeassetForm.markAsPristine();
}
onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.employeeid && employeeidDetail) {
this.hrmsemployeeassetForm.patchValue({
employeeid: employeeidDetail.employeeid,
employeeiddesc: employeeidDetail.employeename,

});

}
}

onSelectedassetid(assetidDetail: any) {
if (assetidDetail.assetid && assetidDetail) {
this.hrmsemployeeassetForm.patchValue({
assetid: assetidDetail.assetid,
assetiddesc: assetidDetail.description,

});
this.hrmsemployeeassetForm.patchValue({reference:assetidDetail.assetcode});
this.hrmsemployeeassetForm.patchValue({description:assetidDetail.assetname});

}
}




resetForm() {
if (this.hrmsemployeeassetForm != null)
this.hrmsemployeeassetForm.reset();
this.hrmsemployeeassetForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let employeeassetid = this.hrmsemployeeassetForm.get('employeeassetid').value;
        if(employeeassetid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeeassetservice.deletehrmsemployeeasset(employeeassetid).then(res =>
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
    this.hrmsemployeeassetForm.patchValue({
        employeeassetid: null
    });
    if(this.hrmsemployeeassetservice.formData.employeeassetid!=null)this.hrmsemployeeassetservice.formData.employeeassetid=null;
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
        else if(key=="assetcheckoutdate")
this.hrmsemployeeassetForm.patchValue({"assetcheckoutdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="assetcheckindate")
this.hrmsemployeeassetForm.patchValue({"assetcheckindate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeeassetForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeeassetForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeeassetForm.controls[key]!=undefined)
{
this.hrmsemployeeassetForm.controls[key].disable({onlySelf: true});
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
employeeidonChange(evt:any){
let e=evt.value;
}
employeeassetidonChange(evt:any){
let e=evt.value;
}
assetidonChange(evt:any){
let e=evt.value;
}
assetcodeonChange(evt:any){
let e=evt.value;
}
assetnameonChange(evt:any){
let e=evt.value;
}
assetcheckoutdateonChange(evt:any){
let e=evt.value;
}
checkedinonChange(evt:any){
let e=evt.value;
}
assetcheckindateonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsemployeeassets() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeeassetservice.gethrmsemployeeassetsByEID(pkcol).then(res => {

this.hrmsemployeeassetservice.formData=res.hrmsemployeeasset;
let formproperty=res.hrmsemployeeasset.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeeasset.pkcol;
this.formid=res.hrmsemployeeasset.employeeassetid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeeasset.employeeassetid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeeassetForm.patchValue({
employeeid: res.hrmsemployeeasset.employeeid,
employeeiddesc: res.hrmsemployeeasset.employeeiddesc,
employeeassetid: res.hrmsemployeeasset.employeeassetid,
assetid: res.hrmsemployeeasset.assetid,
assetiddesc: res.hrmsemployeeasset.assetiddesc,
assetcode: res.hrmsemployeeasset.assetcode,
assetname: res.hrmsemployeeasset.assetname,
assetcheckoutdate: this.ngbDateParserFormatter.parse(res.hrmsemployeeasset.assetcheckoutdate),
checkedin: res.hrmsemployeeasset.checkedin,
assetcheckindate: this.ngbDateParserFormatter.parse(res.hrmsemployeeasset.assetcheckindate),
description: res.hrmsemployeeasset.description,
status: res.hrmsemployeeasset.status,
statusdesc: res.hrmsemployeeasset.statusdesc,
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
  for (let key in this.hrmsemployeeassetForm.controls) {
    if (this.hrmsemployeeassetForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeeassetservice.formData!=null && this.hrmsemployeeassetservice.formData[key]!=null  && this.hrmsemployeeassetservice.formData[key]!='[]' && this.hrmsemployeeassetservice.formData[key]!=undefined && this.hrmsemployeeassetservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeeassetservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeeassetservice.formData!=null && this.hrmsemployeeassetservice.formData[key]!=null   && this.hrmsemployeeassetservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeeassetservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeeassetservice.formData!=null && this.hrmsemployeeassetservice.formData[key]!=null   && this.hrmsemployeeassetservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeeassetservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeeassetservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeeassetForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeeassetForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeeassetForm.value;
obj.assetcheckoutdate=new Date(this.hrmsemployeeassetForm.get('assetcheckoutdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeassetForm.get('assetcheckoutdate').value)+'  UTC' :null);
obj.assetcheckindate=new Date(this.hrmsemployeeassetForm.get('assetcheckindate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeassetForm.get('assetcheckindate').value)+'  UTC' :null);
console.log(obj);
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

private hrmsemployeeassettoggleOption(){
this.hrmsemployeeassetshowOption = this.hrmsemployeeassetshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeeassetForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeeassetForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeeassetForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeeassetservice.formData=this.hrmsemployeeassetForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeeassetForm.controls[key] != null)
    {
        this.hrmsemployeeassetservice.formData[key] = this.hrmsemployeeassetForm.controls[key].value;
    }
}
}
}
this.hrmsemployeeassetservice.formData.assetcheckoutdate=new Date(this.hrmsemployeeassetForm.get('assetcheckoutdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeassetForm.get('assetcheckoutdate').value)+'  UTC' :null);
this.hrmsemployeeassetservice.formData.assetcheckindate=new Date(this.hrmsemployeeassetForm.get('assetcheckindate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeassetForm.get('assetcheckindate').value)+'  UTC' :null);
console.log(this.hrmsemployeeassetservice.formData);
this.hrmsemployeeassetservice.formData=this.hrmsemployeeassetForm.value;
this.hrmsemployeeassetservice.saveOrUpdatehrmsemployeeassets().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeeasset);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeeassetservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeeasset);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeeassetForm.markAsUntouched();
this.hrmsemployeeassetForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditemployeeid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.hrmsemployeeassetForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassetid( assetid) {
/*let ScreenType='2';
this.dialog.open(camsassetmasterComponent, 
{
data: {assetid:this.hrmsemployeeassetForm.get('assetid').value, ScreenType:2 }
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



