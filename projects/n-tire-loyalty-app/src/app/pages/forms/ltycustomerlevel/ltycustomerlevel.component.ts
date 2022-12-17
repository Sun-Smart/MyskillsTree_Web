import { ltycustomerlevelService } from './../../../service/ltycustomerlevel.service';
import { ltycustomerlevel } from './../../../model/ltycustomerlevel.model';
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
import { ltylevel} from './../../../model/ltylevel.model';
import { ltylevelService } from './../../../service/ltylevel.service';
//popups
import { crmcustomermaster} from '../../../../../../n-tire-crm-app/src/app/model/crmcustomermaster.model';
import { crmcustomermasterService } from '../../../../../../n-tire-crm-app/src/app/service/crmcustomermaster.service';
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
selector: 'app-ltycustomerlevel',
templateUrl: './ltycustomerlevel.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltycustomerlevelComponent implements OnInit {
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
bfilterPopulateltycustomerlevels:boolean=false;
dataltycustomerlevelslevelid3:any=[];
dataltycustomerlevelscustomerid3:any=[];
dataltycustomerlevelsoldlevelid3:any=[];
 ltycustomerlevelForm: FormGroup;
levelidList: ltylevel[];
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
oldlevelidList: ltylevel[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
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
private ltycustomerlevelservice: ltycustomerlevelService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private ltylevelservice:ltylevelService,
private crmcustomermasterservice:crmcustomermasterService,
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
this.ltycustomerlevelForm  = this.fb.group({
pk:[null],
customerlevelid: [null],
levelid: [null],
leveliddesc: [null],
customerid: [null],
customeriddesc: [null],
oldlevelid: [null],
oldleveliddesc: [null],
batch: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.ltycustomerlevelForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltycustomerlevelForm.dirty && this.ltycustomerlevelForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.customerlevelid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.customerlevelid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.customerlevelid && pkDetail) {
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
let ltycustomerlevelid = null;

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
this.formid=ltycustomerlevelid;
//this.sharedService.alert(ltycustomerlevelid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.ltylevelservice.getltylevelsList().then(res => 
{
this.levelidList = res as ltylevel[];
}
).catch((err) => {console.log(err);});
this.crmcustomermasterservice.getcrmcustomermastersList().then(res => 
{
this.customeridList = res as crmcustomermaster[];
if(this.ltycustomerlevelservice.formData && this.ltycustomerlevelservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.ltycustomerlevelForm.patchValue({
    customerid: this.ltycustomerlevelservice.formData.customerid,
    customeriddesc: this.ltycustomerlevelservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.ltycustomerlevelForm.get('customerid').value);
let objcustomerid;
if (arrcustomerid.length > 0) objcustomerid = arrcustomerid[0];
if (objcustomerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.customerid_crmcustomermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.customeridList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.customerid_crmcustomermastersformatter = (result: any) => result.lastname;
this.ltylevelservice.getltylevelsList().then(res => 
{
this.oldlevelidList = res as ltylevel[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.ltycustomerlevelservice.getltycustomerlevelsList().then(res => {
      this.pkList = res as ltycustomerlevel[];
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
this.ltycustomerlevelForm.markAsUntouched();
this.ltycustomerlevelForm.markAsPristine();
}
onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.ltycustomerlevelForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});

}
}




resetForm() {
if (this.ltycustomerlevelForm != null)
this.ltycustomerlevelForm.reset();
this.ltycustomerlevelForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let customerlevelid = this.ltycustomerlevelForm.get('customerlevelid').value;
        if(customerlevelid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltycustomerlevelservice.deleteltycustomerlevel(customerlevelid).then(res =>
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
    this.ltycustomerlevelForm.patchValue({
        customerlevelid: null
    });
    if(this.ltycustomerlevelservice.formData.customerlevelid!=null)this.ltycustomerlevelservice.formData.customerlevelid=null;
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
this.ltycustomerlevelForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltycustomerlevelForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltycustomerlevelForm.controls[key]!=undefined)this.ltycustomerlevelForm.controls[key].disable({onlySelf: true});
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
customerlevelidonChange(evt:any){
let e=evt.value;
}
levelidonChange(evt:any){
let e=evt.value;
this.ltycustomerlevelForm.patchValue({leveliddesc:evt.options[evt.options.selectedIndex].text});
}
customeridonChange(evt:any){
let e=evt.value;
}
oldlevelidonChange(evt:any){
let e=evt.value;
this.ltycustomerlevelForm.patchValue({oldleveliddesc:evt.options[evt.options.selectedIndex].text});
}
batchonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.ltycustomerlevelservice.getltycustomerlevelsByEID(pkcol).then(res => {

this.ltycustomerlevelservice.formData=res.ltycustomerlevel;
let formproperty=res.ltycustomerlevel.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltycustomerlevel.pkcol;
this.formid=res.ltycustomerlevel.customerlevelid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltycustomerlevel.customerlevelid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltycustomerlevelForm.patchValue({
customerlevelid: res.ltycustomerlevel.customerlevelid,
levelid: res.ltycustomerlevel.levelid,
leveliddesc: res.ltycustomerlevel.leveliddesc,
customerid: res.ltycustomerlevel.customerid,
customeriddesc: res.ltycustomerlevel.customeriddesc,
oldlevelid: res.ltycustomerlevel.oldlevelid,
oldleveliddesc: res.ltycustomerlevel.oldleveliddesc,
batch: res.ltycustomerlevel.batch,
status: res.ltycustomerlevel.status,
statusdesc: res.ltycustomerlevel.statusdesc,
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
  for (let key in this.ltycustomerlevelForm.controls) {
    if (this.ltycustomerlevelForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltycustomerlevelForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltycustomerlevelForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.ltycustomerlevelForm.value;
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
Object.keys(this.ltycustomerlevelForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltycustomerlevelForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltycustomerlevelForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltycustomerlevelservice.formData=this.ltycustomerlevelForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltycustomerlevelForm.controls[key] != null)
    {
        this.ltycustomerlevelservice.formData[key] = this.ltycustomerlevelForm.controls[key].value;
    }
}
}
}
console.log(this.ltycustomerlevelservice.formData);
this.ltycustomerlevelservice.formData=this.ltycustomerlevelForm.value;
this.ltycustomerlevelservice.saveOrUpdateltycustomerlevels().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltycustomerlevel);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltycustomerlevelservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltycustomerlevel);
}
else
{
this.FillData(res);
}
}
this.ltycustomerlevelForm.markAsUntouched();
this.ltycustomerlevelForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditlevelid( levelid) {
/*let ScreenType='2';
this.dialog.open(ltylevelComponent, 
{
data: {levelid:this.ltycustomerlevelForm.get('levelid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcustomerid( customerid) {
/*let ScreenType='2';
this.dialog.open(crmcustomermasterComponent, 
{
data: {customerid:this.ltycustomerlevelForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditoldlevelid( levelid) {
/*let ScreenType='2';
this.dialog.open(ltylevelComponent, 
{
data: {levelid:this.ltycustomerlevelForm.get('oldlevelid').value, ScreenType:2 }
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



