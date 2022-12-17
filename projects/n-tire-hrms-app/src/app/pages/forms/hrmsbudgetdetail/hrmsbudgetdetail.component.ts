import { hrmsbudgetdetailService } from './../../../service/hrmsbudgetdetail.service';
import { hrmsbudgetdetail } from './../../../model/hrmsbudgetdetail.model';
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
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
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
selector: 'app-hrmsbudgetdetail',
templateUrl: './hrmsbudgetdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsbudgetdetailComponent implements OnInit {
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
bfilterPopulatehrmsbudgetdetails:boolean=false;
datahrmsbudgetdetailsbranchid3:any=[];
datahrmsbudgetdetailsroleid3:any=[];
 hrmsbudgetdetailForm: FormGroup;
branchidList: bobranchmaster[];
roleidList: bouserrolemaster[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsbudgetdetailshowOption:boolean;
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
private hrmsbudgetdetailservice: hrmsbudgetdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
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
this.hrmsbudgetdetailForm  = this.fb.group({
pk:[null],
budgetid: [null],
branchid: [null],
branchiddesc: [null],
revisionno: [null],
detailid: [null],
roleid: [null],
roleiddesc: [null],
m1: [null],
m2: [null],
m3: [null],
m4: [null],
m5: [null],
m6: [null],
m7: [null],
m8: [null],
m9: [null],
m10: [null],
m11: [null],
m12: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsbudgetdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsbudgetdetailForm.dirty && this.hrmsbudgetdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.detailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.detailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.detailid && pkDetail) {
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
let hrmsbudgetdetailid = null;

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
this.formid=hrmsbudgetdetailid;
//this.sharedService.alert(hrmsbudgetdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
}
).catch((err) => {console.log(err);});
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.roleidList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.hrmsbudgetdetailservice.gethrmsbudgetdetailsList().then(res => {
      this.pkList = res as hrmsbudgetdetail[];
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
this.hrmsbudgetdetailForm.markAsUntouched();
this.hrmsbudgetdetailForm.markAsPristine();
}



resetForm() {
if (this.hrmsbudgetdetailForm != null)
this.hrmsbudgetdetailForm.reset();
this.hrmsbudgetdetailForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let detailid = this.hrmsbudgetdetailForm.get('detailid').value;
        if(detailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsbudgetdetailservice.deletehrmsbudgetdetail(detailid).then(res =>
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
    this.hrmsbudgetdetailForm.patchValue({
        detailid: null
    });
    if(this.hrmsbudgetdetailservice.formData.detailid!=null)this.hrmsbudgetdetailservice.formData.detailid=null;
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
this.hrmsbudgetdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsbudgetdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsbudgetdetailForm.controls[key]!=undefined)
{
this.hrmsbudgetdetailForm.controls[key].disable({onlySelf: true});
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
budgetidonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
this.hrmsbudgetdetailForm.patchValue({branchiddesc:evt.options[evt.options.selectedIndex].text});
}
revisionnoonChange(evt:any){
let e=evt.value;
}
detailidonChange(evt:any){
let e=evt.value;
}
roleidonChange(evt:any){
let e=evt.value;
this.hrmsbudgetdetailForm.patchValue({roleiddesc:evt.options[evt.options.selectedIndex].text});
}
m1onChange(evt:any){
let e=evt.value;
}
m2onChange(evt:any){
let e=evt.value;
}
m3onChange(evt:any){
let e=evt.value;
}
m4onChange(evt:any){
let e=evt.value;
}
m5onChange(evt:any){
let e=evt.value;
}
m6onChange(evt:any){
let e=evt.value;
}
m7onChange(evt:any){
let e=evt.value;
}
m8onChange(evt:any){
let e=evt.value;
}
m9onChange(evt:any){
let e=evt.value;
}
m10onChange(evt:any){
let e=evt.value;
}
m11onChange(evt:any){
let e=evt.value;
}
m12onChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsbudgetdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsbudgetdetailservice.gethrmsbudgetdetailsByEID(pkcol).then(res => {

this.hrmsbudgetdetailservice.formData=res.hrmsbudgetdetail;
let formproperty=res.hrmsbudgetdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsbudgetdetail.pkcol;
this.formid=res.hrmsbudgetdetail.detailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsbudgetdetail.detailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsbudgetdetailForm.patchValue({
budgetid: res.hrmsbudgetdetail.budgetid,
branchid: res.hrmsbudgetdetail.branchid,
branchiddesc: res.hrmsbudgetdetail.branchiddesc,
revisionno: res.hrmsbudgetdetail.revisionno,
detailid: res.hrmsbudgetdetail.detailid,
roleid: res.hrmsbudgetdetail.roleid,
roleiddesc: res.hrmsbudgetdetail.roleiddesc,
m1: res.hrmsbudgetdetail.m1,
m2: res.hrmsbudgetdetail.m2,
m3: res.hrmsbudgetdetail.m3,
m4: res.hrmsbudgetdetail.m4,
m5: res.hrmsbudgetdetail.m5,
m6: res.hrmsbudgetdetail.m6,
m7: res.hrmsbudgetdetail.m7,
m8: res.hrmsbudgetdetail.m8,
m9: res.hrmsbudgetdetail.m9,
m10: res.hrmsbudgetdetail.m10,
m11: res.hrmsbudgetdetail.m11,
m12: res.hrmsbudgetdetail.m12,
status: res.hrmsbudgetdetail.status,
statusdesc: res.hrmsbudgetdetail.statusdesc,
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
  for (let key in this.hrmsbudgetdetailForm.controls) {
    if (this.hrmsbudgetdetailForm.controls[key] != null) {
if(false)
{
if(this.hrmsbudgetdetailservice.formData!=null && this.hrmsbudgetdetailservice.formData[key]!=null  && this.hrmsbudgetdetailservice.formData[key]!='[]' && this.hrmsbudgetdetailservice.formData[key]!=undefined && this.hrmsbudgetdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsbudgetdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsbudgetdetailservice.formData!=null && this.hrmsbudgetdetailservice.formData[key]!=null   && this.hrmsbudgetdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsbudgetdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsbudgetdetailservice.formData!=null && this.hrmsbudgetdetailservice.formData[key]!=null   && this.hrmsbudgetdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsbudgetdetailservice.formData[key]+"'><div class='progress__number'>"+this.hrmsbudgetdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsbudgetdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsbudgetdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsbudgetdetailForm.value;
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

private hrmsbudgetdetailtoggleOption(){
this.hrmsbudgetdetailshowOption = this.hrmsbudgetdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsbudgetdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsbudgetdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsbudgetdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsbudgetdetailservice.formData=this.hrmsbudgetdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsbudgetdetailForm.controls[key] != null)
    {
        this.hrmsbudgetdetailservice.formData[key] = this.hrmsbudgetdetailForm.controls[key].value;
    }
}
}
}
console.log(this.hrmsbudgetdetailservice.formData);
this.hrmsbudgetdetailservice.formData=this.hrmsbudgetdetailForm.value;
this.hrmsbudgetdetailservice.saveOrUpdatehrmsbudgetdetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsbudgetdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsbudgetdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsbudgetdetail);
}
else
{
this.FillData(res);
}
}
this.hrmsbudgetdetailForm.markAsUntouched();
this.hrmsbudgetdetailForm.markAsPristine();
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
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.hrmsbudgetdetailForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditroleid( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsbudgetdetailForm.get('roleid').value, ScreenType:2 }
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



