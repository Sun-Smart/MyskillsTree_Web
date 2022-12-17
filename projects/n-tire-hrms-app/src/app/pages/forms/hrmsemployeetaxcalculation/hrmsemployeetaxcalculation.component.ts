import { hrmsemployeetaxcalculationService } from './../../../service/hrmsemployeetaxcalculation.service';
import { hrmsemployeetaxcalculation } from './../../../model/hrmsemployeetaxcalculation.model';
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
import { erptaxmaster} from '../../../../../../n-tire-procurement-app/src/app/model/erptaxmaster.model';
import { erptaxmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erptaxmaster.service';
//popups
import { bofinancialyear} from '../../../../../../n-tire-bo-app/src/app/model/bofinancialyear.model';
import { bofinancialyearService } from '../../../../../../n-tire-bo-app/src/app/service/bofinancialyear.service';
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
selector: 'app-hrmsemployeetaxcalculation',
templateUrl: './hrmsemployeetaxcalculation.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeetaxcalculationComponent implements OnInit {
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
bfilterPopulatehrmsemployeetaxcalculations:boolean=false;
datahrmsemployeetaxcalculationstaxid3:any=[];
datahrmsemployeetaxcalculationsfinancialyear3:any=[];
 hrmsemployeetaxcalculationForm: FormGroup;
taxidList: erptaxmaster[];
taxidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
taxid_erptaxmastersForm: FormGroup;//autocomplete
taxid_erptaxmastersoptions:any;//autocomplete
taxid_erptaxmastersformatter:any;//autocomplete
financialyearList: bofinancialyear[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsemployeetaxcalculationshowOption:boolean;
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
private hrmsemployeetaxcalculationservice: hrmsemployeetaxcalculationService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erptaxmasterservice:erptaxmasterService,
private bofinancialyearservice:bofinancialyearService,
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
this.hrmsemployeetaxcalculationForm  = this.fb.group({
pk:[null],
taxid: [null],
taxiddesc: [null],
employeeid: [null],
financialyear: [null],
financialyeardesc: [null],
totalincome: [null],
lessgeneralwaivers: [null],
lesssectionwaivers: [null],
taxableincome: [null],
lesssectionwaiversontaxableincome: [null],
nettaxamount: [null],
addadditionaltaxontaxamount: [null],
tax: [null],
addadditionaltaxontax: [null],
taxpayable: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeetaxcalculationForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeetaxcalculationForm.dirty && this.hrmsemployeetaxcalculationForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.taxid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.taxid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.taxid && pkDetail) {
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
let hrmsemployeetaxcalculationid = null;

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
this.formid=hrmsemployeetaxcalculationid;
//this.sharedService.alert(hrmsemployeetaxcalculationid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erptaxmasterservice.geterptaxmastersList().then(res => 
{
this.taxidList = res as erptaxmaster[];
if(this.hrmsemployeetaxcalculationservice.formData && this.hrmsemployeetaxcalculationservice.formData.taxid){
this.taxidoptionsEvent.emit(this.taxidList);
this.hrmsemployeetaxcalculationForm.patchValue({
    taxid: this.hrmsemployeetaxcalculationservice.formData.taxid,
    taxiddesc: this.hrmsemployeetaxcalculationservice.formData.taxiddesc,
});
}
{
let arrtaxid = this.taxidList.filter(v => v.taxid == this.hrmsemployeetaxcalculationForm.get('taxid').value);
let objtaxid;
if (arrtaxid.length > 0) objtaxid = arrtaxid[0];
if (objtaxid)
{
}
}
}
).catch((err) => {console.log(err);});
this.taxid_erptaxmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.taxidList.filter(v => v.taxname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.taxid_erptaxmastersformatter = (result: any) => result.taxname;
this.bofinancialyearservice.getbofinancialyearsList().then(res => 
{
this.financialyearList = res as bofinancialyear[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.hrmsemployeetaxcalculationservice.gethrmsemployeetaxcalculationsList().then(res => {
      this.pkList = res as hrmsemployeetaxcalculation[];
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
this.hrmsemployeetaxcalculationForm.markAsUntouched();
this.hrmsemployeetaxcalculationForm.markAsPristine();
}
onSelectedtaxid(taxidDetail: any) {
if (taxidDetail.taxid && taxidDetail) {
this.hrmsemployeetaxcalculationForm.patchValue({
taxid: taxidDetail.taxid,
taxiddesc: taxidDetail.taxname,

});

}
}




resetForm() {
if (this.hrmsemployeetaxcalculationForm != null)
this.hrmsemployeetaxcalculationForm.reset();
this.hrmsemployeetaxcalculationForm.patchValue({
financialyear: this.sessiondata.finyearid,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let taxid = this.hrmsemployeetaxcalculationForm.get('taxid').value;
        if(taxid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeetaxcalculationservice.deletehrmsemployeetaxcalculation(taxid).then(res =>
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
    this.hrmsemployeetaxcalculationForm.patchValue({
        taxid: null
    });
    if(this.hrmsemployeetaxcalculationservice.formData.taxid!=null)this.hrmsemployeetaxcalculationservice.formData.taxid=null;
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
this.hrmsemployeetaxcalculationForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeetaxcalculationForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeetaxcalculationForm.controls[key]!=undefined)
{
this.hrmsemployeetaxcalculationForm.controls[key].disable({onlySelf: true});
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
taxidonChange(evt:any){
let e=evt.value;
}
employeeidonChange(evt:any){
let e=evt.value;
}
financialyearonChange(evt:any){
let e=evt.value;
this.hrmsemployeetaxcalculationForm.patchValue({financialyeardesc:evt.options[evt.options.selectedIndex].text});
}
totalincomeonChange(evt:any){
let e=evt.value;
}
lessgeneralwaiversonChange(evt:any){
let e=evt.value;
}
lesssectionwaiversonChange(evt:any){
let e=evt.value;
}
taxableincomeonChange(evt:any){
let e=evt.value;
}
lesssectionwaiversontaxableincomeonChange(evt:any){
let e=evt.value;
}
nettaxamountonChange(evt:any){
let e=evt.value;
}
addadditionaltaxontaxamountonChange(evt:any){
let e=evt.value;
}
taxonChange(evt:any){
let e=evt.value;
}
addadditionaltaxontaxonChange(evt:any){
let e=evt.value;
}
taxpayableonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsemployeetaxcalculations() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeetaxcalculationservice.gethrmsemployeetaxcalculationsByEID(pkcol).then(res => {

this.hrmsemployeetaxcalculationservice.formData=res.hrmsemployeetaxcalculation;
let formproperty=res.hrmsemployeetaxcalculation.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeetaxcalculation.pkcol;
this.formid=res.hrmsemployeetaxcalculation.taxid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeetaxcalculation.taxid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeetaxcalculationForm.patchValue({
taxid: res.hrmsemployeetaxcalculation.taxid,
taxiddesc: res.hrmsemployeetaxcalculation.taxiddesc,
employeeid: res.hrmsemployeetaxcalculation.employeeid,
financialyear: res.hrmsemployeetaxcalculation.financialyear,
financialyeardesc: res.hrmsemployeetaxcalculation.financialyeardesc,
totalincome: res.hrmsemployeetaxcalculation.totalincome,
lessgeneralwaivers: res.hrmsemployeetaxcalculation.lessgeneralwaivers,
lesssectionwaivers: res.hrmsemployeetaxcalculation.lesssectionwaivers,
taxableincome: res.hrmsemployeetaxcalculation.taxableincome,
lesssectionwaiversontaxableincome: res.hrmsemployeetaxcalculation.lesssectionwaiversontaxableincome,
nettaxamount: res.hrmsemployeetaxcalculation.nettaxamount,
addadditionaltaxontaxamount: res.hrmsemployeetaxcalculation.addadditionaltaxontaxamount,
tax: res.hrmsemployeetaxcalculation.tax,
addadditionaltaxontax: res.hrmsemployeetaxcalculation.addadditionaltaxontax,
taxpayable: res.hrmsemployeetaxcalculation.taxpayable,
status: res.hrmsemployeetaxcalculation.status,
statusdesc: res.hrmsemployeetaxcalculation.statusdesc,
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
  for (let key in this.hrmsemployeetaxcalculationForm.controls) {
    if (this.hrmsemployeetaxcalculationForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeetaxcalculationservice.formData!=null && this.hrmsemployeetaxcalculationservice.formData[key]!=null  && this.hrmsemployeetaxcalculationservice.formData[key]!='[]' && this.hrmsemployeetaxcalculationservice.formData[key]!=undefined && this.hrmsemployeetaxcalculationservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeetaxcalculationservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeetaxcalculationservice.formData!=null && this.hrmsemployeetaxcalculationservice.formData[key]!=null   && this.hrmsemployeetaxcalculationservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeetaxcalculationservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeetaxcalculationservice.formData!=null && this.hrmsemployeetaxcalculationservice.formData[key]!=null   && this.hrmsemployeetaxcalculationservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeetaxcalculationservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeetaxcalculationservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeetaxcalculationForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeetaxcalculationForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeetaxcalculationForm.value;
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

private hrmsemployeetaxcalculationtoggleOption(){
this.hrmsemployeetaxcalculationshowOption = this.hrmsemployeetaxcalculationshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeetaxcalculationForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeetaxcalculationForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeetaxcalculationForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeetaxcalculationservice.formData=this.hrmsemployeetaxcalculationForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeetaxcalculationForm.controls[key] != null)
    {
        this.hrmsemployeetaxcalculationservice.formData[key] = this.hrmsemployeetaxcalculationForm.controls[key].value;
    }
}
}
}
console.log(this.hrmsemployeetaxcalculationservice.formData);
this.hrmsemployeetaxcalculationservice.formData=this.hrmsemployeetaxcalculationForm.value;
this.hrmsemployeetaxcalculationservice.saveOrUpdatehrmsemployeetaxcalculations().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeetaxcalculation);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeetaxcalculationservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeetaxcalculation);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeetaxcalculationForm.markAsUntouched();
this.hrmsemployeetaxcalculationForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdittaxid( taxid) {
/*let ScreenType='2';
this.dialog.open(erptaxmasterComponent, 
{
data: {taxid:this.hrmsemployeetaxcalculationForm.get('taxid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditfinancialyear( finyearid) {
/*let ScreenType='2';
this.dialog.open(bofinancialyearComponent, 
{
data: {finyearid:this.hrmsemployeetaxcalculationForm.get('financialyear').value, ScreenType:2 }
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



