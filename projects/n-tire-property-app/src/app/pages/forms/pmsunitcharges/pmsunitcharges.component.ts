import { pmsunitchargesService } from './../../../service/pmsunitcharges.service';
import { pmsunitcharges } from './../../../model/pmsunitcharges.model';
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
import { pmsproperty} from './../../../model/pmsproperty.model';
import { pmspropertyComponent } from './../../../pages/forms/pmsproperty/pmsproperty.component';
import { pmspropertyService } from './../../../service/pmsproperty.service';
//popups
import { pmspropertyunit} from './../../../model/pmspropertyunit.model';
import { pmspropertyunitComponent } from './../../../pages/forms/pmspropertyunit/pmspropertyunit.component';
import { pmspropertyunitService } from './../../../service/pmspropertyunit.service';
//popups
import { pmspropertyowner} from './../../../model/pmspropertyowner.model';
import { pmspropertyownerComponent } from './../../../pages/forms/pmspropertyowner/pmspropertyowner.component';
import { pmspropertyownerService } from './../../../service/pmspropertyowner.service';
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
selector: 'app-pmsunitcharges',
templateUrl: './pmsunitcharges.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmsunitchargesComponent implements OnInit {
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
bfilterPopulatepmsunitcharges:boolean=false;
datapmsunitchargespropertyid3:any=[];
datapmsunitchargesunitid3:any=[];
datapmsunitchargesownerid3:any=[];
datapmsunitchargeschargecycle3:any=[];
datapmsunitchargeschargetype3:any=[];
 pmsunitchargesForm: FormGroup;
propertyidList: pmsproperty[];
propertyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
propertyid_pmspropertiesForm: FormGroup;//autocomplete
propertyid_pmspropertiesoptions:any;//autocomplete
propertyid_pmspropertiesformatter:any;//autocomplete
unitidList: pmspropertyunit[];
owneridList: pmspropertyowner[];
chargecycleList: boconfigvalue[];
chargetypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
pmsunitchargesshowOption:boolean;
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
private pmsunitchargesservice: pmsunitchargesService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private pmspropertyservice:pmspropertyService,
private pmspropertyunitservice:pmspropertyunitService,
private pmspropertyownerservice:pmspropertyownerService,
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
this.pmsunitchargesForm  = this.fb.group({
pk:[null],
chargeid: [null],
propertyid: [null],
propertyiddesc: [null],
unitid: [null],
unitiddesc: [null],
ownerid: [null],
owneriddesc: [null],
chargecycle: [null],
chargecycledesc: [null],
chargetype: [null],
chargetypedesc: [null],
chargeamount: [null],
validstartdate: [null],
validenddate: [null],
notes: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmsunitchargesForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmsunitchargesForm.dirty && this.pmsunitchargesForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.chargeid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.chargeid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.chargeid && pkDetail) {
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
let pmsunitchargesid = null;

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
this.formid=pmsunitchargesid;
//this.sharedService.alert(pmsunitchargesid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.pmspropertyservice.getpmspropertiesList().then(res => 
{
this.propertyidList = res as pmsproperty[];
if(this.pmsunitchargesservice.formData && this.pmsunitchargesservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmsunitchargesForm.patchValue({
    propertyid: this.pmsunitchargesservice.formData.propertyid,
    propertyiddesc: this.pmsunitchargesservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmsunitchargesForm.get('propertyid').value);
let objpropertyid;
if (arrpropertyid.length > 0) objpropertyid = arrpropertyid[0];
if (objpropertyid)
{
}
}
}
).catch((err) => {console.log(err);});
this.propertyid_pmspropertiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.propertyidList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.propertyid_pmspropertiesformatter = (result: any) => result.title;
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
if(this.pmsunitchargesservice.formData && this.pmsunitchargesservice.formData.unitid){this.pmsunitchargesForm.patchValue({
    unitid: this.pmsunitchargesservice.formData.unitid,
    unitiddesc: this.pmsunitchargesservice.formData.unitiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.pmspropertyownerservice.getpmspropertyownersList().then(res => 
{
this.owneridList = res as pmspropertyowner[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("chargecycle").then(res => this.chargecycleList = res as boconfigvalue[]);
this.configservice.getList("chargetype").then(res => this.chargetypeList = res as boconfigvalue[]);

//autocomplete
    this.pmsunitchargesservice.getpmsunitchargesList().then(res => {
      this.pkList = res as pmsunitcharges[];
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
this.pmsunitchargesForm.markAsUntouched();
this.pmsunitchargesForm.markAsPristine();
}
onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmsunitchargesForm.patchValue({
propertyid: propertyidDetail.propertyid,
propertyiddesc: propertyidDetail.title,

});
this.pmspropertyunitservice.getListBypropertyid(propertyidDetail.propertyid).then(res => {
 this.unitidList = res as pmspropertyunit[]
}).catch((err) => {console.log(err);});

}
}




resetForm() {
if (this.pmsunitchargesForm != null)
this.pmsunitchargesForm.reset();
this.pmsunitchargesForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let chargeid = this.pmsunitchargesForm.get('chargeid').value;
        if(chargeid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmsunitchargesservice.deletepmsunitcharges(chargeid).then(res =>
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
    this.pmsunitchargesForm.patchValue({
        chargeid: null
    });
    if(this.pmsunitchargesservice.formData.chargeid!=null)this.pmsunitchargesservice.formData.chargeid=null;
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
        else if(key=="validstartdate")
this.pmsunitchargesForm.patchValue({"validstartdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validenddate")
this.pmsunitchargesForm.patchValue({"validenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmsunitchargesForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmsunitchargesForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmsunitchargesForm.controls[key]!=undefined)
{
this.pmsunitchargesForm.controls[key].disable({onlySelf: true});
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
chargeidonChange(evt:any){
let e=evt.value;
}
propertyidonChange(evt:any){
let e=evt.value;
}
unitidonChange(evt:any){
let e=evt.value;
this.pmsunitchargesForm.patchValue({unitiddesc:evt.options[evt.options.selectedIndex].text});
}
owneridonChange(evt:any){
let e=evt.value;
this.pmsunitchargesForm.patchValue({owneriddesc:evt.options[evt.options.selectedIndex].text});
}
chargecycleonChange(evt:any){
let e=this.f.chargecycle.value as any;
this.pmsunitchargesForm.patchValue({chargecycledesc:evt.options[evt.options.selectedIndex].text});
}
chargetypeonChange(evt:any){
let e=this.f.chargetype.value as any;
this.pmsunitchargesForm.patchValue({chargetypedesc:evt.options[evt.options.selectedIndex].text});
}
chargeamountonChange(evt:any){
let e=evt.value;
}
validstartdateonChange(evt:any){
let e=evt.value;
}
validenddateonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editpmsunitcharges() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmsunitchargesservice.getpmsunitchargesByEID(pkcol).then(res => {

this.pmsunitchargesservice.formData=res.pmsunitcharges;
let formproperty=res.pmsunitcharges.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmsunitcharges.pkcol;
this.formid=res.pmsunitcharges.chargeid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmsunitcharges.chargeid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmsunitchargesForm.patchValue({
chargeid: res.pmsunitcharges.chargeid,
propertyid: res.pmsunitcharges.propertyid,
propertyiddesc: res.pmsunitcharges.propertyiddesc,
unitid: res.pmsunitcharges.unitid,
unitiddesc: res.pmsunitcharges.unitiddesc,
ownerid: res.pmsunitcharges.ownerid,
owneriddesc: res.pmsunitcharges.owneriddesc,
chargecycle: res.pmsunitcharges.chargecycle,
chargecycledesc: res.pmsunitcharges.chargecycledesc,
chargetype: res.pmsunitcharges.chargetype,
chargetypedesc: res.pmsunitcharges.chargetypedesc,
chargeamount: res.pmsunitcharges.chargeamount,
validstartdate: this.ngbDateParserFormatter.parse(res.pmsunitcharges.validstartdate),
validenddate: this.ngbDateParserFormatter.parse(res.pmsunitcharges.validenddate),
notes: res.pmsunitcharges.notes,
status: res.pmsunitcharges.status,
statusdesc: res.pmsunitcharges.statusdesc,
});
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
}).catch((err) => {console.log(err);});
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
  for (let key in this.pmsunitchargesForm.controls) {
    if (this.pmsunitchargesForm.controls[key] != null) {
if(false)
{
if(this.pmsunitchargesservice.formData!=null && this.pmsunitchargesservice.formData[key]!=null  && this.pmsunitchargesservice.formData[key]!='[]' && this.pmsunitchargesservice.formData[key]!=undefined && this.pmsunitchargesservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmsunitchargesservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmsunitchargesservice.formData!=null && this.pmsunitchargesservice.formData[key]!=null   && this.pmsunitchargesservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmsunitchargesservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmsunitchargesservice.formData!=null && this.pmsunitchargesservice.formData[key]!=null   && this.pmsunitchargesservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmsunitchargesservice.formData[key]+"'><div class='progress__number'>"+this.pmsunitchargesservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmsunitchargesForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmsunitchargesForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmsunitchargesForm.value;
obj.validstartdate=new Date(this.pmsunitchargesForm.get('validstartdate').value ? this.ngbDateParserFormatter.format(this.pmsunitchargesForm.get('validstartdate').value)+'  UTC' :null);
obj.validenddate=new Date(this.pmsunitchargesForm.get('validenddate').value ? this.ngbDateParserFormatter.format(this.pmsunitchargesForm.get('validenddate').value)+'  UTC' :null);
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

private pmsunitchargestoggleOption(){
this.pmsunitchargesshowOption = this.pmsunitchargesshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmsunitchargesForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmsunitchargesForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmsunitchargesForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmsunitchargesservice.formData=this.pmsunitchargesForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmsunitchargesForm.controls[key] != null)
    {
        this.pmsunitchargesservice.formData[key] = this.pmsunitchargesForm.controls[key].value;
    }
}
}
}
this.pmsunitchargesservice.formData.validstartdate=new Date(this.pmsunitchargesForm.get('validstartdate').value ? this.ngbDateParserFormatter.format(this.pmsunitchargesForm.get('validstartdate').value)+'  UTC' :null);
this.pmsunitchargesservice.formData.validenddate=new Date(this.pmsunitchargesForm.get('validenddate').value ? this.ngbDateParserFormatter.format(this.pmsunitchargesForm.get('validenddate').value)+'  UTC' :null);
console.log(this.pmsunitchargesservice.formData);
this.pmsunitchargesservice.formData=this.pmsunitchargesForm.value;
this.pmsunitchargesservice.saveOrUpdatepmsunitcharges().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmsunitcharges);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmsunitchargesservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmsunitcharges);
}
else
{
this.FillData(res);
}
}
this.pmsunitchargesForm.markAsUntouched();
this.pmsunitchargesForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpropertyid( propertyid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyComponent, 
{
data: {propertyid:this.pmsunitchargesForm.get('propertyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditunitid( unitid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyunitComponent, 
{
data: {unitid:this.pmsunitchargesForm.get('unitid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditownerid( ownerid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyownerComponent, 
{
data: {ownerid:this.pmsunitchargesForm.get('ownerid').value, ScreenType:2 }
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



