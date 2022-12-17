import { bolocationService } from './../../../service/bolocation.service';
import { bolocation } from './../../../model/bolocation.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { bobranchlocation} from './../../../model/bobranchlocation.model';
import { bobranchlocationService } from './../../../service/bobranchlocation.service';
//popups
import { bouserbranchaccess} from './../../../model/bouserbranchaccess.model';
import { bouserbranchaccessService } from './../../../service/bouserbranchaccess.service';
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
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments
import { customfieldconfigurationService } from './../../../service/customfieldconfiguration.service';
import { customfieldconfiguration } from './../../../model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-bolocation',
templateUrl: './bolocation.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bolocationComponent implements OnInit {
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
bfilterPopulatebolocations:boolean=false;
databolocationslocationid3:any=[];
databolocationsbranchid3:any=[];
 bolocationForm: FormGroup;
locationidList: bobranchlocation[];
locationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
locationid_bobranchlocationsForm: FormGroup;//autocomplete
locationid_bobranchlocationsoptions:any;//autocomplete
locationid_bobranchlocationsformatter:any;//autocomplete
branchidList: any[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bouserbranchaccessesForm: FormGroup;//autocomplete
branchid_bouserbranchaccessesoptions:any;//autocomplete
branchid_bouserbranchaccessesformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
customfieldjson: any;
customfieldvisible:boolean=true;
SESSIONUSERID:any;//current user
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bolocationservice: bolocationService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchlocationservice:bobranchlocationService,
private bouserbranchaccessservice:bouserbranchaccessService,
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
this.bolocationForm  = this.fb.group({pk:[null],locationid: [null],
locationiddesc: [null],
branchid: [null],
branchiddesc: [null],
code: [null],
name: [null],
postalcode: [null],
state: [null],
stateid: [null],
city: [null],
cityid: [null],
latitude: [null],
longitude: [null],
areadetails: [null],
population: [null],
remarks: [null],
customfield: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bolocationForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bolocationForm.dirty && this.bolocationForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.locationid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.locationid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.locationid && pkDetail) {
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
let bolocationid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
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
this.formid=bolocationid;
//this.sharedService.alert(bolocationid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.locationidList = res as bobranchlocation[];
if(this.bolocationservice.formData && this.bolocationservice.formData.locationid){
this.locationidoptionsEvent.emit(this.locationidList);
this.bolocationForm.patchValue({
    locationid: this.bolocationservice.formData.locationid,
    locationiddesc: this.bolocationservice.formData.locationiddesc,
});
}
{
let arrlocationid = this.locationidList.filter(v => v.locationid == this.bolocationForm.get('locationid').value);
let objlocationid;
if (arrlocationid.length > 0) objlocationid = arrlocationid[0];
if (objlocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.locationid_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.locationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.locationid_bobranchlocationsformatter = (result: any) => result.locationname;
this.bouserbranchaccessservice.getbouserbranchaccessesList().then(res => 
{
this.branchidList = res as bouserbranchaccess[];
if(this.bolocationservice.formData && this.bolocationservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.bolocationForm.patchValue({
    branchid: this.bolocationservice.formData.branchid,
    branchiddesc: this.bolocationservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.bolocationForm.get('branchid').value);
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

//autocomplete
    this.bolocationservice.getbolocationsList().then(res => {
      this.pkList = res as bolocation[];
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
this.bolocationForm.markAsUntouched();
this.bolocationForm.markAsPristine();
}
onSelectedlocationid(locationidDetail: any) {
if (locationidDetail.locationid && locationidDetail) {
this.bolocationForm.patchValue({
locationid: locationidDetail.locationid,
locationiddesc: locationidDetail.locationname,

});

}
}

onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.bolocationForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}




resetForm() {
if (this.bolocationForm != null)
this.bolocationForm.reset();
this.bolocationForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let locationid = this.bolocationForm.get('locationid').value;
        if(locationid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bolocationservice.deletebolocation(locationid).then(res =>
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
    this.bolocationForm.patchValue({
        locationid: null
    });
    if(this.bolocationservice.formData.locationid!=null)this.bolocationservice.formData.locationid=null;
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
this.bolocationForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bolocationForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bolocationForm.controls[key]!=undefined)this.bolocationForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("bolocations",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


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
locationidonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
codeonChange(evt:any){
let e=evt.value;
}
nameonChange(evt:any){
let e=evt.value;
}
postalcodeonChange(evt:any){
let e=evt.value;
}
stateonChange(evt:any){
let e=evt.value;
}
stateidonChange(evt:any){
let e=evt.value;
}
cityonChange(evt:any){
let e=evt.value;
}
cityidonChange(evt:any){
let e=evt.value;
}
latitudeonChange(evt:any){
let e=evt.value;
}
longitudeonChange(evt:any){
let e=evt.value;
}
areadetailsonChange(evt:any){
let e=evt.value;
}
populationonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
customfieldonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.bolocationservice.getbolocationsByEID(pkcol).then(res => {

this.bolocationservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bolocation.locationid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bolocation.locationid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bolocationForm.patchValue({
locationid: res.bolocation.locationid,
locationiddesc: res.bolocation.locationiddesc,
branchid: res.bolocation.branchid,
branchiddesc: res.bolocation.branchiddesc,
code: res.bolocation.code,
name: res.bolocation.name,
postalcode: res.bolocation.postalcode,
state: res.bolocation.state,
stateid: res.bolocation.stateid,
city: res.bolocation.city,
cityid: res.bolocation.cityid,
latitude: res.bolocation.latitude,
longitude: res.bolocation.longitude,
areadetails: res.bolocation.areadetails,
population: res.bolocation.population,
remarks: res.bolocation.remarks,
customfield: res.bolocation.customfield,
status: res.bolocation.status,
statusdesc: res.bolocation.statusdesc,
});
if(this.bolocationForm.get('customfield').value!=null && this.bolocationForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.bolocationForm.get('customfield').value);
this.FillCustomField();
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
  for (let key in this.bolocationForm.controls) {
    if (this.bolocationForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bolocationForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bolocationForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.bolocationForm.value;
obj.customfield=JSON.stringify(customfields);
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bolocationForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bolocationForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bolocationForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bolocationservice.formData=this.bolocationForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bolocationForm.controls[key] != null)
    {
        this.bolocationservice.formData[key] = this.bolocationForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.bolocationservice.formData.customfield=JSON.stringify(customfields);
console.log(this.bolocationservice.formData);
this.bolocationservice.formData=this.bolocationForm.value;
this.bolocationservice.saveOrUpdatebolocations().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bolocation);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bolocationservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bolocation);
}
else
{
this.FillData(res);
}
}
this.bolocationForm.markAsUntouched();
this.bolocationForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.bolocationForm.get('locationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bouserbranchaccessComponent, 
{
data: {branchid:this.bolocationForm.get('branchid').value, ScreenType:2 }
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



