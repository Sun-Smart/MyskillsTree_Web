import { pmsworkorderdetailService } from './../../../service/pmsworkorderdetail.service';
import { pmsworkorderdetail } from './../../../model/pmsworkorderdetail.model';
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
import { pmsworkorder} from './../../../model/pmsworkorder.model';
import { pmsworkorderService } from './../../../service/pmsworkorder.service';
//popups
import { pmsproperty} from './../../../model/pmsproperty.model';
import { pmspropertyService } from './../../../service/pmsproperty.service';
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
selector: 'app-pmsworkorderdetail',
templateUrl: './pmsworkorderdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmsworkorderdetailComponent implements OnInit {
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
bfilterPopulatepmsworkorderdetails:boolean=false;
datapmsworkorderdetailsworkorderid3:any=[];
datapmsworkorderdetailspropertyid3:any=[];
 pmsworkorderdetailForm: FormGroup;
workorderidList: pmsworkorder[];
workorderidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
workorderid_pmsworkordersForm: FormGroup;//autocomplete
workorderid_pmsworkordersoptions:any;//autocomplete
workorderid_pmsworkordersformatter:any;//autocomplete
propertyidList: pmsproperty[];
propertyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
propertyid_pmspropertiesForm: FormGroup;//autocomplete
propertyid_pmspropertiesoptions:any;//autocomplete
propertyid_pmspropertiesformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
pmsworkorderdetailshowOption:boolean;
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
private pmsworkorderdetailservice: pmsworkorderdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private pmsworkorderservice:pmsworkorderService,
private pmspropertyservice:pmspropertyService,
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
this.pmsworkorderdetailForm  = this.fb.group({
pk:[null],
workorderdetailid: [null],
workorderid: [null],
workorderiddesc: [null],
propertyid: [null],
propertyiddesc: [null],
description: [null],
quantity: [null],
amounteach: [null],
totalamount: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmsworkorderdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmsworkorderdetailForm.dirty && this.pmsworkorderdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.workorderdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.workorderdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.workorderdetailid && pkDetail) {
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
let pmsworkorderdetailid = null;

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
this.formid=pmsworkorderdetailid;
//this.sharedService.alert(pmsworkorderdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.pmsworkorderservice.getpmsworkordersList().then(res => 
{
this.workorderidList = res as pmsworkorder[];
if(this.pmsworkorderdetailservice.formData && this.pmsworkorderdetailservice.formData.workorderid){
this.workorderidoptionsEvent.emit(this.workorderidList);
this.pmsworkorderdetailForm.patchValue({
    workorderid: this.pmsworkorderdetailservice.formData.workorderid,
    workorderiddesc: this.pmsworkorderdetailservice.formData.workorderiddesc,
});
}
{
let arrworkorderid = this.workorderidList.filter(v => v.workorderid == this.pmsworkorderdetailForm.get('workorderid').value);
let objworkorderid;
if (arrworkorderid.length > 0) objworkorderid = arrworkorderid[0];
if (objworkorderid)
{
}
}
}
).catch((err) => {console.log(err);});
this.workorderid_pmsworkordersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.workorderidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.workorderid_pmsworkordersformatter = (result: any) => result.description;
this.pmspropertyservice.getpmspropertiesList().then(res => 
{
this.propertyidList = res as pmsproperty[];
if(this.pmsworkorderdetailservice.formData && this.pmsworkorderdetailservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmsworkorderdetailForm.patchValue({
    propertyid: this.pmsworkorderdetailservice.formData.propertyid,
    propertyiddesc: this.pmsworkorderdetailservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmsworkorderdetailForm.get('propertyid').value);
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

//autocomplete
    this.pmsworkorderdetailservice.getpmsworkorderdetailsList().then(res => {
      this.pkList = res as pmsworkorderdetail[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.description;

//setting the flag that the screen is not touched 
this.pmsworkorderdetailForm.markAsUntouched();
this.pmsworkorderdetailForm.markAsPristine();
}
onSelectedworkorderid(workorderidDetail: any) {
if (workorderidDetail.workorderid && workorderidDetail) {
this.pmsworkorderdetailForm.patchValue({
workorderid: workorderidDetail.workorderid,
workorderiddesc: workorderidDetail.description,

});

}
}

onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmsworkorderdetailForm.patchValue({
propertyid: propertyidDetail.propertyid,
propertyiddesc: propertyidDetail.title,

});

}
}




resetForm() {
if (this.pmsworkorderdetailForm != null)
this.pmsworkorderdetailForm.reset();
this.pmsworkorderdetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let workorderdetailid = this.pmsworkorderdetailForm.get('workorderdetailid').value;
        if(workorderdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmsworkorderdetailservice.deletepmsworkorderdetail(workorderdetailid).then(res =>
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
    this.pmsworkorderdetailForm.patchValue({
        workorderdetailid: null
    });
    if(this.pmsworkorderdetailservice.formData.workorderdetailid!=null)this.pmsworkorderdetailservice.formData.workorderdetailid=null;
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
this.pmsworkorderdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmsworkorderdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmsworkorderdetailForm.controls[key]!=undefined)
{
this.pmsworkorderdetailForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.pmsworkorderdetailservice.formData.description!=null )
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
workorderdetailidonChange(evt:any){
let e=evt.value;
}
workorderidonChange(evt:any){
let e=evt.value;
}
propertyidonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
quantityonChange(evt:any){
let e=evt.value;
}
amounteachonChange(evt:any){
let e=evt.value;
}
totalamountonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editpmsworkorderdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmsworkorderdetailservice.getpmsworkorderdetailsByEID(pkcol).then(res => {

this.pmsworkorderdetailservice.formData=res.pmsworkorderdetail;
let formproperty=res.pmsworkorderdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmsworkorderdetail.pkcol;
this.formid=res.pmsworkorderdetail.workorderdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmsworkorderdetail.workorderdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmsworkorderdetailForm.patchValue({
workorderdetailid: res.pmsworkorderdetail.workorderdetailid,
workorderid: res.pmsworkorderdetail.workorderid,
workorderiddesc: res.pmsworkorderdetail.workorderiddesc,
propertyid: res.pmsworkorderdetail.propertyid,
propertyiddesc: res.pmsworkorderdetail.propertyiddesc,
description: res.pmsworkorderdetail.description,
quantity: res.pmsworkorderdetail.quantity,
amounteach: res.pmsworkorderdetail.amounteach,
totalamount: res.pmsworkorderdetail.totalamount,
status: res.pmsworkorderdetail.status,
statusdesc: res.pmsworkorderdetail.statusdesc,
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
  for (let key in this.pmsworkorderdetailForm.controls) {
    if (this.pmsworkorderdetailForm.controls[key] != null) {
if(false)
{
if(this.pmsworkorderdetailservice.formData!=null && this.pmsworkorderdetailservice.formData[key]!=null  && this.pmsworkorderdetailservice.formData[key]!='[]' && this.pmsworkorderdetailservice.formData[key]!=undefined && this.pmsworkorderdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmsworkorderdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmsworkorderdetailservice.formData!=null && this.pmsworkorderdetailservice.formData[key]!=null   && this.pmsworkorderdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmsworkorderdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmsworkorderdetailservice.formData!=null && this.pmsworkorderdetailservice.formData[key]!=null   && this.pmsworkorderdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmsworkorderdetailservice.formData[key]+"'><div class='progress__number'>"+this.pmsworkorderdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmsworkorderdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmsworkorderdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmsworkorderdetailForm.value;
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

private pmsworkorderdetailtoggleOption(){
this.pmsworkorderdetailshowOption = this.pmsworkorderdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmsworkorderdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmsworkorderdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmsworkorderdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmsworkorderdetailservice.formData=this.pmsworkorderdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmsworkorderdetailForm.controls[key] != null)
    {
        this.pmsworkorderdetailservice.formData[key] = this.pmsworkorderdetailForm.controls[key].value;
    }
}
}
}
console.log(this.pmsworkorderdetailservice.formData);
this.pmsworkorderdetailservice.formData=this.pmsworkorderdetailForm.value;
this.pmsworkorderdetailservice.saveOrUpdatepmsworkorderdetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmsworkorderdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmsworkorderdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmsworkorderdetail);
}
else
{
this.FillData(res);
}
}
this.pmsworkorderdetailForm.markAsUntouched();
this.pmsworkorderdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditworkorderid( workorderid) {
/*let ScreenType='2';
this.dialog.open(pmsworkorderComponent, 
{
data: {workorderid:this.pmsworkorderdetailForm.get('workorderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpropertyid( propertyid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyComponent, 
{
data: {propertyid:this.pmsworkorderdetailForm.get('propertyid').value, ScreenType:2 }
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



