import { camsmisccostService } from './../../../service/camsmisccost.service';
import { camsmisccost } from './../../../model/camsmisccost.model';
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
import { camsworkorder} from './../../../model/camsworkorder.model';
import { camsworkorderComponent } from './../../../pages/forms/camsworkorder/camsworkorder.component';
import { camsworkorderService } from './../../../service/camsworkorder.service';
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
selector: 'app-camsmisccost',
templateUrl: './camsmisccost.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsmisccostComponent implements OnInit {
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
bfilterPopulatecamsmisccosts:boolean=false;
datacamsmisccostsworkorderid3:any=[];
datacamsmisccostscosttype3:any=[];
datacamsmisccostsapprovalstatus3:any=[];
 camsmisccostForm: FormGroup;
workorderidList: camsworkorder[];
workorderidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
workorderid_camsworkordersForm: FormGroup;//autocomplete
workorderid_camsworkordersoptions:any;//autocomplete
workorderid_camsworkordersformatter:any;//autocomplete
costtypeList: boconfigvalue[];
approvalstatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
camsmisccostshowOption:boolean;
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
private camsmisccostservice: camsmisccostService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private camsworkorderservice:camsworkorderService,
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
this.camsmisccostForm  = this.fb.group({
pk:[null],
costid: [null],
workorderid: [null],
workorderiddesc: [null],
costtype: [null],
costtypedesc: [null],
description: [null],
estimatedunitcost: [null],
estimatedquantity: [null],
estimatedcost: [null],
actualquantity: [null],
actualunitcost: [null],
totalcost: [null],
approvalstatus: [null],
approvalstatusdesc: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsmisccostForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsmisccostForm.dirty && this.camsmisccostForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.costid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.costid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.costid && pkDetail) {
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
let camsmisccostid = null;

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
this.formid=camsmisccostid;
//this.sharedService.alert(camsmisccostid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camsworkorderservice.getcamsworkordersList().then(res => 
{
this.workorderidList = res as camsworkorder[];
if(this.camsmisccostservice.formData && this.camsmisccostservice.formData.workorderid){
this.workorderidoptionsEvent.emit(this.workorderidList);
this.camsmisccostForm.patchValue({
    workorderid: this.camsmisccostservice.formData.workorderid,
    workorderiddesc: this.camsmisccostservice.formData.workorderiddesc,
});
}
{
let arrworkorderid = this.workorderidList.filter(v => v.workorderid == this.camsmisccostForm.get('workorderid').value);
let objworkorderid;
if (arrworkorderid.length > 0) objworkorderid = arrworkorderid[0];
if (objworkorderid)
{
}
}
}
).catch((err) => {console.log(err);});
this.workorderid_camsworkordersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.workorderidList.filter(v => v.requestreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.workorderid_camsworkordersformatter = (result: any) => result.requestreference;
this.configservice.getList("costtype").then(res => this.costtypeList = res as boconfigvalue[]);
this.configservice.getList("approvalstatus").then(res => this.approvalstatusList = res as boconfigvalue[]);

//autocomplete
    this.camsmisccostservice.getcamsmisccostsList().then(res => {
      this.pkList = res as camsmisccost[];
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
this.camsmisccostForm.markAsUntouched();
this.camsmisccostForm.markAsPristine();
}
onSelectedworkorderid(workorderidDetail: any) {
if (workorderidDetail.workorderid && workorderidDetail) {
this.camsmisccostForm.patchValue({
workorderid: workorderidDetail.workorderid,
workorderiddesc: workorderidDetail.requestreference,

});

}
}




resetForm() {
if (this.camsmisccostForm != null)
this.camsmisccostForm.reset();
this.camsmisccostForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let costid = this.camsmisccostForm.get('costid').value;
        if(costid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsmisccostservice.deletecamsmisccost(costid).then(res =>
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
    this.camsmisccostForm.patchValue({
        costid: null
    });
    if(this.camsmisccostservice.formData.costid!=null)this.camsmisccostservice.formData.costid=null;
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
this.camsmisccostForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsmisccostForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsmisccostForm.controls[key]!=undefined)
{
this.camsmisccostForm.controls[key].disable({onlySelf: true});
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
costidonChange(evt:any){
let e=evt.value;
}
workorderidonChange(evt:any){
let e=evt.value;
}
costtypeonChange(evt:any){
let e=this.f.costtype.value as any;
this.camsmisccostForm.patchValue({costtypedesc:evt.options[evt.options.selectedIndex].text});
}
descriptiononChange(evt:any){
let e=evt.value;
}
estimatedunitcostonChange(evt:any){
let e=evt.value;
}
estimatedquantityonChange(evt:any){
let e=evt.value;
}
estimatedcostonChange(evt:any){
let e=evt.value;
}
actualquantityonChange(evt:any){
let e=evt.value;
}
actualunitcostonChange(evt:any){
let e=evt.value;
}
totalcostonChange(evt:any){
let e=evt.value;
}
approvalstatusonChange(evt:any){
let e=this.f.approvalstatus.value as any;
this.camsmisccostForm.patchValue({approvalstatusdesc:evt.options[evt.options.selectedIndex].text});
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editcamsmisccosts() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsmisccostservice.getcamsmisccostsByEID(pkcol).then(res => {

this.camsmisccostservice.formData=res.camsmisccost;
let formproperty=res.camsmisccost.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsmisccost.pkcol;
this.formid=res.camsmisccost.costid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsmisccost.costid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsmisccostForm.patchValue({
costid: res.camsmisccost.costid,
workorderid: res.camsmisccost.workorderid,
workorderiddesc: res.camsmisccost.workorderiddesc,
costtype: res.camsmisccost.costtype,
costtypedesc: res.camsmisccost.costtypedesc,
description: res.camsmisccost.description,
estimatedunitcost: res.camsmisccost.estimatedunitcost,
estimatedquantity: res.camsmisccost.estimatedquantity,
estimatedcost: res.camsmisccost.estimatedcost,
actualquantity: res.camsmisccost.actualquantity,
actualunitcost: res.camsmisccost.actualunitcost,
totalcost: res.camsmisccost.totalcost,
approvalstatus: res.camsmisccost.approvalstatus,
approvalstatusdesc: res.camsmisccost.approvalstatusdesc,
remarks: res.camsmisccost.remarks,
status: res.camsmisccost.status,
statusdesc: res.camsmisccost.statusdesc,
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
  for (let key in this.camsmisccostForm.controls) {
    if (this.camsmisccostForm.controls[key] != null) {
if(false)
{
if(this.camsmisccostservice.formData!=null && this.camsmisccostservice.formData[key]!=null  && this.camsmisccostservice.formData[key]!='[]' && this.camsmisccostservice.formData[key]!=undefined && this.camsmisccostservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsmisccostservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsmisccostservice.formData!=null && this.camsmisccostservice.formData[key]!=null   && this.camsmisccostservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsmisccostservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsmisccostservice.formData!=null && this.camsmisccostservice.formData[key]!=null   && this.camsmisccostservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsmisccostservice.formData[key]+"'><div class='progress__number'>"+this.camsmisccostservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsmisccostForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsmisccostForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.camsmisccostForm.value;
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

private camsmisccosttoggleOption(){
this.camsmisccostshowOption = this.camsmisccostshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsmisccostForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsmisccostForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsmisccostForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsmisccostservice.formData=this.camsmisccostForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsmisccostForm.controls[key] != null)
    {
        this.camsmisccostservice.formData[key] = this.camsmisccostForm.controls[key].value;
    }
}
}
}
console.log(this.camsmisccostservice.formData);
this.camsmisccostservice.formData=this.camsmisccostForm.value;
this.camsmisccostservice.saveOrUpdatecamsmisccosts().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsmisccost);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsmisccostservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsmisccost);
}
else
{
this.FillData(res);
}
}
this.camsmisccostForm.markAsUntouched();
this.camsmisccostForm.markAsPristine();
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
this.dialog.open(camsworkorderComponent, 
{
data: {workorderid:this.camsmisccostForm.get('workorderid').value, ScreenType:2 }
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



