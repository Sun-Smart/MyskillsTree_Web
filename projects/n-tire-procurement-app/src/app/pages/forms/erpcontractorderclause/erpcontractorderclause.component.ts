import { erpcontractorderclauseService } from './../../../service/erpcontractorderclause.service';
import { erpcontractorderclause } from './../../../model/erpcontractorderclause.model';
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
import { erpcontractordermaster} from './../../../model/erpcontractordermaster.model';
import { erpcontractordermasterComponent } from './../../../pages/forms/erpcontractordermaster/erpcontractordermaster.component';
import { erpcontractordermasterService } from './../../../service/erpcontractordermaster.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
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
selector: 'app-erpcontractorderclause',
templateUrl: './erpcontractorderclause.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpcontractorderclauseComponent implements OnInit {
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
bfilterPopulateerpcontractorderclauses:boolean=false;
dataerpcontractorderclausescontractid3:any=[];
dataerpcontractorderclausessupplierid3:any=[];
 erpcontractorderclauseForm: FormGroup;
contractidList: erpcontractordermaster[];
contractidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
contractid_erpcontractordermastersForm: FormGroup;//autocomplete
contractid_erpcontractordermastersoptions:any;//autocomplete
contractid_erpcontractordermastersformatter:any;//autocomplete
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpcontractorderclauseshowOption:boolean;
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
private erpcontractorderclauseservice: erpcontractorderclauseService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpcontractordermasterservice:erpcontractordermasterService,
private erpsuppliermasterservice:erpsuppliermasterService,
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
this.erpcontractorderclauseForm  = this.fb.group({
pk:[null],
contractid: [null],
contractiddesc: [null],
supplierid: [null],
supplieriddesc: [null],
contractclauseid: [null],
clauseid: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpcontractorderclauseForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpcontractorderclauseForm.dirty && this.erpcontractorderclauseForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.contractclauseid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.contractclauseid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.contractclauseid && pkDetail) {
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
let erpcontractorderclauseid = null;

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
this.formid=erpcontractorderclauseid;
//this.sharedService.alert(erpcontractorderclauseid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpcontractordermasterservice.geterpcontractordermastersList().then(res => 
{
this.contractidList = res as erpcontractordermaster[];
if(this.erpcontractorderclauseservice.formData && this.erpcontractorderclauseservice.formData.contractid){
this.contractidoptionsEvent.emit(this.contractidList);
this.erpcontractorderclauseForm.patchValue({
    contractid: this.erpcontractorderclauseservice.formData.contractid,
    contractiddesc: this.erpcontractorderclauseservice.formData.contractiddesc,
});
}
{
let arrcontractid = this.contractidList.filter(v => v.contractid == this.erpcontractorderclauseForm.get('contractid').value);
let objcontractid;
if (arrcontractid.length > 0) objcontractid = arrcontractid[0];
if (objcontractid)
{
}
}
}
).catch((err) => {console.log(err);});
this.contractid_erpcontractordermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.contractidList.filter(v => v.contractname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.contractid_erpcontractordermastersformatter = (result: any) => result.contractname;
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpcontractorderclauseservice.formData && this.erpcontractorderclauseservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpcontractorderclauseForm.patchValue({
    supplierid: this.erpcontractorderclauseservice.formData.supplierid,
    supplieriddesc: this.erpcontractorderclauseservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpcontractorderclauseForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
    this.erpcontractorderclauseForm.patchValue({ creditdays: objsupplierid.creditdays });
}
}
}
).catch((err) => {console.log(err);});
this.supplierid_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierid_erpsuppliermastersformatter = (result: any) => result.suppliercode;

//autocomplete
    this.erpcontractorderclauseservice.geterpcontractorderclausesList().then(res => {
      this.pkList = res as erpcontractorderclause[];
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
this.erpcontractorderclauseForm.markAsUntouched();
this.erpcontractorderclauseForm.markAsPristine();
}
onSelectedcontractid(contractidDetail: any) {
if (contractidDetail.contractid && contractidDetail) {
this.erpcontractorderclauseForm.patchValue({
contractid: contractidDetail.contractid,
contractiddesc: contractidDetail.contractname,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpcontractorderclauseForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});
this.erpcontractorderclauseForm.patchValue({creditdays:supplieridDetail.creditdays});

}
}




resetForm() {
if (this.erpcontractorderclauseForm != null)
this.erpcontractorderclauseForm.reset();
this.erpcontractorderclauseForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let contractclauseid = this.erpcontractorderclauseForm.get('contractclauseid').value;
        if(contractclauseid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpcontractorderclauseservice.deleteerpcontractorderclause(contractclauseid).then(res =>
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
    this.erpcontractorderclauseForm.patchValue({
        contractclauseid: null
    });
    if(this.erpcontractorderclauseservice.formData.contractclauseid!=null)this.erpcontractorderclauseservice.formData.contractclauseid=null;
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
this.erpcontractorderclauseForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpcontractorderclauseForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpcontractorderclauseForm.controls[key]!=undefined)
{
this.erpcontractorderclauseForm.controls[key].disable({onlySelf: true});
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
contractidonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
contractclauseidonChange(evt:any){
let e=evt.value;
}
clauseidonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpcontractorderclauses() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpcontractorderclauseservice.geterpcontractorderclausesByEID(pkcol).then(res => {

this.erpcontractorderclauseservice.formData=res.erpcontractorderclause;
let formproperty=res.erpcontractorderclause.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpcontractorderclause.pkcol;
this.formid=res.erpcontractorderclause.contractclauseid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpcontractorderclause.contractclauseid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpcontractorderclauseForm.patchValue({
contractid: res.erpcontractorderclause.contractid,
contractiddesc: res.erpcontractorderclause.contractiddesc,
supplierid: res.erpcontractorderclause.supplierid,
supplieriddesc: res.erpcontractorderclause.supplieriddesc,
contractclauseid: res.erpcontractorderclause.contractclauseid,
clauseid: res.erpcontractorderclause.clauseid,
status: res.erpcontractorderclause.status,
statusdesc: res.erpcontractorderclause.statusdesc,
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
  for (let key in this.erpcontractorderclauseForm.controls) {
    if (this.erpcontractorderclauseForm.controls[key] != null) {
if(false)
{
if(this.erpcontractorderclauseservice.formData!=null && this.erpcontractorderclauseservice.formData[key]!=null  && this.erpcontractorderclauseservice.formData[key]!='[]' && this.erpcontractorderclauseservice.formData[key]!=undefined && this.erpcontractorderclauseservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpcontractorderclauseservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpcontractorderclauseservice.formData!=null && this.erpcontractorderclauseservice.formData[key]!=null   && this.erpcontractorderclauseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpcontractorderclauseservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpcontractorderclauseservice.formData!=null && this.erpcontractorderclauseservice.formData[key]!=null   && this.erpcontractorderclauseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpcontractorderclauseservice.formData[key]+"'><div class='progress__number'>"+this.erpcontractorderclauseservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpcontractorderclauseForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpcontractorderclauseForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpcontractorderclauseForm.value;
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

private erpcontractorderclausetoggleOption(){
this.erpcontractorderclauseshowOption = this.erpcontractorderclauseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpcontractorderclauseForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpcontractorderclauseForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpcontractorderclauseForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpcontractorderclauseservice.formData=this.erpcontractorderclauseForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpcontractorderclauseForm.controls[key] != null)
    {
        this.erpcontractorderclauseservice.formData[key] = this.erpcontractorderclauseForm.controls[key].value;
    }
}
}
}
console.log(this.erpcontractorderclauseservice.formData);
this.erpcontractorderclauseservice.formData=this.erpcontractorderclauseForm.value;
this.erpcontractorderclauseservice.saveOrUpdateerpcontractorderclauses().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpcontractorderclause);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpcontractorderclauseservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpcontractorderclause);
}
else
{
this.FillData(res);
}
}
this.erpcontractorderclauseForm.markAsUntouched();
this.erpcontractorderclauseForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcontractid( contractid) {
/*let ScreenType='2';
this.dialog.open(erpcontractordermasterComponent, 
{
data: {contractid:this.erpcontractorderclauseForm.get('contractid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpcontractorderclauseForm.get('supplierid').value, ScreenType:2 }
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



