import { hrmsemployeemonthlysalaryregulardeductionService } from './../../../service/hrmsemployeemonthlysalaryregulardeduction.service';
import { hrmsemployeemonthlysalaryregulardeduction } from './../../../model/hrmsemployeemonthlysalaryregulardeduction.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
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
selector: 'app-hrmsemployeemonthlysalaryregulardeduction',
templateUrl: './hrmsemployeemonthlysalaryregulardeduction.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeemonthlysalaryregulardeductionComponent implements OnInit {
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
bfilterPopulatehrmsemployeemonthlysalaryregulardeductions:boolean=false;
datahrmsemployeemonthlysalaryregulardeductionsmonth3:any=[];
datahrmsemployeemonthlysalaryregulardeductionsemployeeid3:any=[];
datahrmsemployeemonthlysalaryregulardeductionsdeductionhead3:any=[];
 hrmsemployeemonthlysalaryregulardeductionForm: FormGroup;
monthList: boconfigvalue[];
employeeidList: hrmsemployee[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_hrmsemployeesForm: FormGroup;//autocomplete
employeeid_hrmsemployeesoptions:any;//autocomplete
employeeid_hrmsemployeesformatter:any;//autocomplete
deductionheadList: bomasterdata[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsemployeemonthlysalaryregulardeductionshowOption:boolean;
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
private hrmsemployeemonthlysalaryregulardeductionservice: hrmsemployeemonthlysalaryregulardeductionService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsemployeeservice:hrmsemployeeService,
private bomasterdataservice:bomasterdataService,
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
this.hrmsemployeemonthlysalaryregulardeductionForm  = this.fb.group({
pk:[null],
salid: [null],
month: [null],
monthdesc: [null],
year: [null],
employeeid: [null],
employeeiddesc: [null],
deductionhead: [null],
deductionheaddesc: [null],
value: [null],
pkid: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeemonthlysalaryregulardeductionForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeemonthlysalaryregulardeductionForm.dirty && this.hrmsemployeemonthlysalaryregulardeductionForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.pkid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.pkid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.pkid && pkDetail) {
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
let hrmsemployeemonthlysalaryregulardeductionid = null;

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
this.formid=hrmsemployeemonthlysalaryregulardeductionid;
//this.sharedService.alert(hrmsemployeemonthlysalaryregulardeductionid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("month").then(res => this.monthList = res as boconfigvalue[]);
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.employeeidList = res as hrmsemployee[];
if(this.hrmsemployeemonthlysalaryregulardeductionservice.formData && this.hrmsemployeemonthlysalaryregulardeductionservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsemployeemonthlysalaryregulardeductionForm.patchValue({
    employeeid: this.hrmsemployeemonthlysalaryregulardeductionservice.formData.employeeid,
    employeeiddesc: this.hrmsemployeemonthlysalaryregulardeductionservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.employeeid == this.hrmsemployeemonthlysalaryregulardeductionForm.get('employeeid').value);
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
this.bomasterdataservice.getList("khsgr").then(res => {
this.deductionheadList = res as bomasterdata[];
}).catch((err) => {console.log(err);});

//autocomplete
    this.hrmsemployeemonthlysalaryregulardeductionservice.gethrmsemployeemonthlysalaryregulardeductionsList().then(res => {
      this.pkList = res as hrmsemployeemonthlysalaryregulardeduction[];
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
this.hrmsemployeemonthlysalaryregulardeductionForm.markAsUntouched();
this.hrmsemployeemonthlysalaryregulardeductionForm.markAsPristine();
}
onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.employeeid && employeeidDetail) {
this.hrmsemployeemonthlysalaryregulardeductionForm.patchValue({
employeeid: employeeidDetail.employeeid,
employeeiddesc: employeeidDetail.employeename,

});

}
}




resetForm() {
if (this.hrmsemployeemonthlysalaryregulardeductionForm != null)
this.hrmsemployeemonthlysalaryregulardeductionForm.reset();
this.hrmsemployeemonthlysalaryregulardeductionForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let pkid = this.hrmsemployeemonthlysalaryregulardeductionForm.get('pkid').value;
        if(pkid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeemonthlysalaryregulardeductionservice.deletehrmsemployeemonthlysalaryregulardeduction(pkid).then(res =>
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
    this.hrmsemployeemonthlysalaryregulardeductionForm.patchValue({
        pkid: null
    });
    if(this.hrmsemployeemonthlysalaryregulardeductionservice.formData.pkid!=null)this.hrmsemployeemonthlysalaryregulardeductionservice.formData.pkid=null;
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
this.hrmsemployeemonthlysalaryregulardeductionForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeemonthlysalaryregulardeductionForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeemonthlysalaryregulardeductionForm.controls[key]!=undefined)
{
this.hrmsemployeemonthlysalaryregulardeductionForm.controls[key].disable({onlySelf: true});
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
salidonChange(evt:any){
let e=evt.value;
}
monthonChange(evt:any){
let e=this.f.month.value as any;
this.hrmsemployeemonthlysalaryregulardeductionForm.patchValue({monthdesc:evt.options[evt.options.selectedIndex].text});
}
yearonChange(evt:any){
let e=evt.value;
}
employeeidonChange(evt:any){
let e=evt.value;
}
deductionheadonChange(evt:any){
let e=evt.value;
this.hrmsemployeemonthlysalaryregulardeductionForm.patchValue({deductionheaddesc:evt.options[evt.options.selectedIndex].text});
}
valueonChange(evt:any){
let e=evt.value;
}
pkidonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsemployeemonthlysalaryregulardeductions() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeemonthlysalaryregulardeductionservice.gethrmsemployeemonthlysalaryregulardeductionsByEID(pkcol).then(res => {

this.hrmsemployeemonthlysalaryregulardeductionservice.formData=res.hrmsemployeemonthlysalaryregulardeduction;
let formproperty=res.hrmsemployeemonthlysalaryregulardeduction.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeemonthlysalaryregulardeduction.pkcol;
this.formid=res.hrmsemployeemonthlysalaryregulardeduction.pkid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeemonthlysalaryregulardeduction.pkid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeemonthlysalaryregulardeductionForm.patchValue({
salid: res.hrmsemployeemonthlysalaryregulardeduction.salid,
month: res.hrmsemployeemonthlysalaryregulardeduction.month,
monthdesc: res.hrmsemployeemonthlysalaryregulardeduction.monthdesc,
year: res.hrmsemployeemonthlysalaryregulardeduction.year,
employeeid: res.hrmsemployeemonthlysalaryregulardeduction.employeeid,
employeeiddesc: res.hrmsemployeemonthlysalaryregulardeduction.employeeiddesc,
deductionhead: res.hrmsemployeemonthlysalaryregulardeduction.deductionhead,
deductionheaddesc: res.hrmsemployeemonthlysalaryregulardeduction.deductionheaddesc,
value: res.hrmsemployeemonthlysalaryregulardeduction.value,
pkid: res.hrmsemployeemonthlysalaryregulardeduction.pkid,
status: res.hrmsemployeemonthlysalaryregulardeduction.status,
statusdesc: res.hrmsemployeemonthlysalaryregulardeduction.statusdesc,
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
  for (let key in this.hrmsemployeemonthlysalaryregulardeductionForm.controls) {
    if (this.hrmsemployeemonthlysalaryregulardeductionForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeemonthlysalaryregulardeductionservice.formData!=null && this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key]!=null  && this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key]!='[]' && this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key]!=undefined && this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeemonthlysalaryregulardeductionservice.formData!=null && this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key]!=null   && this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeemonthlysalaryregulardeductionservice.formData!=null && this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key]!=null   && this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeemonthlysalaryregulardeductionForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeemonthlysalaryregulardeductionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeemonthlysalaryregulardeductionForm.value;
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

private hrmsemployeemonthlysalaryregulardeductiontoggleOption(){
this.hrmsemployeemonthlysalaryregulardeductionshowOption = this.hrmsemployeemonthlysalaryregulardeductionshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeemonthlysalaryregulardeductionForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeemonthlysalaryregulardeductionForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeemonthlysalaryregulardeductionForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeemonthlysalaryregulardeductionservice.formData=this.hrmsemployeemonthlysalaryregulardeductionForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeemonthlysalaryregulardeductionForm.controls[key] != null)
    {
        this.hrmsemployeemonthlysalaryregulardeductionservice.formData[key] = this.hrmsemployeemonthlysalaryregulardeductionForm.controls[key].value;
    }
}
}
}
console.log(this.hrmsemployeemonthlysalaryregulardeductionservice.formData);
this.hrmsemployeemonthlysalaryregulardeductionservice.formData=this.hrmsemployeemonthlysalaryregulardeductionForm.value;
this.hrmsemployeemonthlysalaryregulardeductionservice.saveOrUpdatehrmsemployeemonthlysalaryregulardeductions().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeemonthlysalaryregulardeduction);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeemonthlysalaryregulardeductionservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeemonthlysalaryregulardeduction);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeemonthlysalaryregulardeductionForm.markAsUntouched();
this.hrmsemployeemonthlysalaryregulardeductionForm.markAsPristine();
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
data: {employeeid:this.hrmsemployeemonthlysalaryregulardeductionForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdeductionhead( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsemployeemonthlysalaryregulardeductionForm.get('deductionhead').value, ScreenType:2 }
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



