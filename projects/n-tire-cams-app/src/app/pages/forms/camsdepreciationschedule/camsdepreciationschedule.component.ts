import { camsdepreciationscheduleService } from './../../../service/camsdepreciationschedule.service';
import { camsdepreciationschedule } from './../../../model/camsdepreciationschedule.model';
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
import { camsassetmaster} from './../../../model/camsassetmaster.model';
import { camsassetmasterComponent } from './../../../pages/forms/camsassetmaster/camsassetmaster.component';
import { camsassetmasterService } from './../../../service/camsassetmaster.service';
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
selector: 'app-camsdepreciationschedule',
templateUrl: './camsdepreciationschedule.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class camsdepreciationscheduleComponent implements OnInit {
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
bfilterPopulatecamsdepreciationschedules:boolean=false;
datacamsdepreciationschedulesassetid3:any=[];
 camsdepreciationscheduleForm: FormGroup;
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
camsdepreciationscheduleshowOption:boolean;
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
private camsdepreciationscheduleservice: camsdepreciationscheduleService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.camsdepreciationscheduleForm  = this.fb.group({
pk:[null],
scheduleid: [null],
assetid: [null],
assetiddesc: [null],
year: [null],
currentdepreciation: [null],
cumulativedepreciation: [null],
bookvalue: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.camsdepreciationscheduleForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.camsdepreciationscheduleForm.dirty && this.camsdepreciationscheduleForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.scheduleid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.scheduleid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.scheduleid && pkDetail) {
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
let camsdepreciationscheduleid = null;

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
this.formid=camsdepreciationscheduleid;
//this.sharedService.alert(camsdepreciationscheduleid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.camsassetmasterservice.getcamsassetmastersList().then(res => 
{
this.assetidList = res as camsassetmaster[];
if(this.camsdepreciationscheduleservice.formData && this.camsdepreciationscheduleservice.formData.assetid){
this.assetidoptionsEvent.emit(this.assetidList);
this.camsdepreciationscheduleForm.patchValue({
    assetid: this.camsdepreciationscheduleservice.formData.assetid,
    assetiddesc: this.camsdepreciationscheduleservice.formData.assetiddesc,
});
}
{
let arrassetid = this.assetidList.filter(v => v.assetid == this.camsdepreciationscheduleForm.get('assetid').value);
let objassetid;
if (arrassetid.length > 0) objassetid = arrassetid[0];
if (objassetid)
{
    this.camsdepreciationscheduleForm.patchValue({ currentlocation: objassetid.locationid });
    this.camsdepreciationscheduleForm.patchValue({ assignedto: objassetid.fromemployee });
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
    this.camsdepreciationscheduleservice.getcamsdepreciationschedulesList().then(res => {
      this.pkList = res as camsdepreciationschedule[];
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
this.camsdepreciationscheduleForm.markAsUntouched();
this.camsdepreciationscheduleForm.markAsPristine();
}
onSelectedassetid(assetidDetail: any) {
if (assetidDetail.assetid && assetidDetail) {
this.camsdepreciationscheduleForm.patchValue({
assetid: assetidDetail.assetid,
assetiddesc: assetidDetail.description,

});
this.camsdepreciationscheduleForm.patchValue({currentlocation:assetidDetail.locationid});
this.camsdepreciationscheduleForm.patchValue({assignedto:assetidDetail.fromemployee});

}
}




resetForm() {
if (this.camsdepreciationscheduleForm != null)
this.camsdepreciationscheduleForm.reset();
this.camsdepreciationscheduleForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let scheduleid = this.camsdepreciationscheduleForm.get('scheduleid').value;
        if(scheduleid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.camsdepreciationscheduleservice.deletecamsdepreciationschedule(scheduleid).then(res =>
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
    this.camsdepreciationscheduleForm.patchValue({
        scheduleid: null
    });
    if(this.camsdepreciationscheduleservice.formData.scheduleid!=null)this.camsdepreciationscheduleservice.formData.scheduleid=null;
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
this.camsdepreciationscheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.camsdepreciationscheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.camsdepreciationscheduleForm.controls[key]!=undefined)
{
this.camsdepreciationscheduleForm.controls[key].disable({onlySelf: true});
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
scheduleidonChange(evt:any){
let e=evt.value;
}
assetidonChange(evt:any){
let e=evt.value;
}
yearonChange(evt:any){
let e=evt.value;
}
currentdepreciationonChange(evt:any){
let e=evt.value;
}
cumulativedepreciationonChange(evt:any){
let e=evt.value;
}
bookvalueonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editcamsdepreciationschedules() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.camsdepreciationscheduleservice.getcamsdepreciationschedulesByEID(pkcol).then(res => {

this.camsdepreciationscheduleservice.formData=res.camsdepreciationschedule;
let formproperty=res.camsdepreciationschedule.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.camsdepreciationschedule.pkcol;
this.formid=res.camsdepreciationschedule.scheduleid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.camsdepreciationschedule.scheduleid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.camsdepreciationscheduleForm.patchValue({
scheduleid: res.camsdepreciationschedule.scheduleid,
assetid: res.camsdepreciationschedule.assetid,
assetiddesc: res.camsdepreciationschedule.assetiddesc,
year: res.camsdepreciationschedule.year,
currentdepreciation: res.camsdepreciationschedule.currentdepreciation,
cumulativedepreciation: res.camsdepreciationschedule.cumulativedepreciation,
bookvalue: res.camsdepreciationschedule.bookvalue,
status: res.camsdepreciationschedule.status,
statusdesc: res.camsdepreciationschedule.statusdesc,
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
  for (let key in this.camsdepreciationscheduleForm.controls) {
    if (this.camsdepreciationscheduleForm.controls[key] != null) {
if(false)
{
if(this.camsdepreciationscheduleservice.formData!=null && this.camsdepreciationscheduleservice.formData[key]!=null  && this.camsdepreciationscheduleservice.formData[key]!='[]' && this.camsdepreciationscheduleservice.formData[key]!=undefined && this.camsdepreciationscheduleservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.camsdepreciationscheduleservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.camsdepreciationscheduleservice.formData!=null && this.camsdepreciationscheduleservice.formData[key]!=null   && this.camsdepreciationscheduleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.camsdepreciationscheduleservice.formData[key]+"></div>");
}
else if(false)
{
if(this.camsdepreciationscheduleservice.formData!=null && this.camsdepreciationscheduleservice.formData[key]!=null   && this.camsdepreciationscheduleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.camsdepreciationscheduleservice.formData[key]+"'><div class='progress__number'>"+this.camsdepreciationscheduleservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.camsdepreciationscheduleForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.camsdepreciationscheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.camsdepreciationscheduleForm.value;
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

private camsdepreciationscheduletoggleOption(){
this.camsdepreciationscheduleshowOption = this.camsdepreciationscheduleshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.camsdepreciationscheduleForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.camsdepreciationscheduleForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.camsdepreciationscheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.camsdepreciationscheduleservice.formData=this.camsdepreciationscheduleForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.camsdepreciationscheduleForm.controls[key] != null)
    {
        this.camsdepreciationscheduleservice.formData[key] = this.camsdepreciationscheduleForm.controls[key].value;
    }
}
}
}
console.log(this.camsdepreciationscheduleservice.formData);
this.camsdepreciationscheduleservice.formData=this.camsdepreciationscheduleForm.value;
this.camsdepreciationscheduleservice.saveOrUpdatecamsdepreciationschedules().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsdepreciationschedule);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.camsdepreciationscheduleservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).camsdepreciationschedule);
}
else
{
this.FillData(res);
}
}
this.camsdepreciationscheduleForm.markAsUntouched();
this.camsdepreciationscheduleForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditassetid( assetid) {
/*let ScreenType='2';
this.dialog.open(camsassetmasterComponent, 
{
data: {assetid:this.camsdepreciationscheduleForm.get('assetid').value, ScreenType:2 }
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



