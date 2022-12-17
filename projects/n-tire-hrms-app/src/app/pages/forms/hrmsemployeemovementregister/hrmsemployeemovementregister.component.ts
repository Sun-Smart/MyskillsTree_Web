import { hrmsemployeemovementregisterService } from './../../../service/hrmsemployeemovementregister.service';
import { hrmsemployeemovementregister } from './../../../model/hrmsemployeemovementregister.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-hrmsemployeemovementregister',
templateUrl: './hrmsemployeemovementregister.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeemovementregisterComponent implements OnInit {
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
bfilterPopulatehrmsemployeemovementregisters:boolean=false;
datahrmsemployeemovementregistersemployeeid3:any=[];
datahrmsemployeemovementregistersdepartmentid3:any=[];
datahrmsemployeemovementregistersmovementcategory3:any=[];
 hrmsemployeemovementregisterForm: FormGroup;
employeeidList: bousermaster[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_bousermastersForm: FormGroup;//autocomplete
employeeid_bousermastersoptions:any;//autocomplete
employeeid_bousermastersformatter:any;//autocomplete
departmentidList: bomasterdata[];
movementcategoryList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsemployeemovementregistershowOption:boolean;
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
private hrmsemployeemovementregisterservice: hrmsemployeemovementregisterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
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
this.hrmsemployeemovementregisterForm  = this.fb.group({
pk:[null],
movementid: [null],
referenceno: [null],
movementdate: [null],
employeeid: [null],
employeeiddesc: [null],
employeename: [null],
departmentid: [null],
departmentiddesc: [null],
intime: [null],
outtime: [null],
movementcategory: [null],
movementcategorydesc: [null],
reason: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeemovementregisterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeemovementregisterForm.dirty && this.hrmsemployeemovementregisterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.movementid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.movementid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.movementid && pkDetail) {
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
let hrmsemployeemovementregisterid = null;

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
this.formid=hrmsemployeemovementregisterid;
//this.sharedService.alert(hrmsemployeemovementregisterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.employeeidList = res as bousermaster[];
if(this.hrmsemployeemovementregisterservice.formData && this.hrmsemployeemovementregisterservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.hrmsemployeemovementregisterForm.patchValue({
    employeeid: this.hrmsemployeemovementregisterservice.formData.employeeid,
    employeeiddesc: this.hrmsemployeemovementregisterservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.userid == this.hrmsemployeemovementregisterForm.get('employeeid').value);
let objemployeeid;
if (arremployeeid.length > 0) objemployeeid = arremployeeid[0];
if (objemployeeid)
{
}
}
}
).catch((err) => {console.log(err);});
this.employeeid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.employeeidList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.employeeid_bousermastersformatter = (result: any) => result.username;
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("movementcategory").then(res => this.movementcategoryList = res as boconfigvalue[]);

//autocomplete
    this.hrmsemployeemovementregisterservice.gethrmsemployeemovementregistersList().then(res => {
      this.pkList = res as hrmsemployeemovementregister[];
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
this.hrmsemployeemovementregisterForm.markAsUntouched();
this.hrmsemployeemovementregisterForm.markAsPristine();
}
onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.userid && employeeidDetail) {
this.hrmsemployeemovementregisterForm.patchValue({
employeeid: employeeidDetail.userid,
employeeiddesc: employeeidDetail.username,

});

}
}




resetForm() {
if (this.hrmsemployeemovementregisterForm != null)
this.hrmsemployeemovementregisterForm.reset();
this.hrmsemployeemovementregisterForm.patchValue({
employeeid: this.sessiondata.userid,
employeeiddesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let movementid = this.hrmsemployeemovementregisterForm.get('movementid').value;
        if(movementid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeemovementregisterservice.deletehrmsemployeemovementregister(movementid).then(res =>
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
    this.hrmsemployeemovementregisterForm.patchValue({
        movementid: null
    });
    if(this.hrmsemployeemovementregisterservice.formData.movementid!=null)this.hrmsemployeemovementregisterservice.formData.movementid=null;
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
        else if(key=="movementdate")
this.hrmsemployeemovementregisterForm.patchValue({"movementdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="intime")
this.hrmsemployeemovementregisterForm.patchValue({"intime":new Time(mainscreendata[key]) });
        else if(key=="outtime")
this.hrmsemployeemovementregisterForm.patchValue({"outtime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeemovementregisterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeemovementregisterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeemovementregisterForm.controls[key]!=undefined)
{
this.hrmsemployeemovementregisterForm.controls[key].disable({onlySelf: true});
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
movementidonChange(evt:any){
let e=evt.value;
}
referencenoonChange(evt:any){
let e=evt.value;
}
movementdateonChange(evt:any){
let e=evt.value;
}
employeeidonChange(evt:any){
let e=evt.value;
}
employeenameonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
this.hrmsemployeemovementregisterForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
intimeonChange(evt:any){
let e=evt.value;
}
outtimeonChange(evt:any){
let e=evt.value;
}
movementcategoryonChange(evt:any){
let e=this.f.movementcategory.value as any;
this.hrmsemployeemovementregisterForm.patchValue({movementcategorydesc:evt.options[evt.options.selectedIndex].text});
}
reasononChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsemployeemovementregisters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeemovementregisterservice.gethrmsemployeemovementregistersByEID(pkcol).then(res => {

this.hrmsemployeemovementregisterservice.formData=res.hrmsemployeemovementregister;
let formproperty=res.hrmsemployeemovementregister.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeemovementregister.pkcol;
this.formid=res.hrmsemployeemovementregister.movementid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeemovementregister.movementid;
var intimeTime=new Time( res.hrmsemployeemovementregister.intime);
var outtimeTime=new Time( res.hrmsemployeemovementregister.outtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeemovementregisterForm.patchValue({
movementid: res.hrmsemployeemovementregister.movementid,
referenceno: res.hrmsemployeemovementregister.referenceno,
movementdate: this.ngbDateParserFormatter.parse(res.hrmsemployeemovementregister.movementdate),
employeeid: res.hrmsemployeemovementregister.employeeid,
employeeiddesc: res.hrmsemployeemovementregister.employeeiddesc,
employeename: res.hrmsemployeemovementregister.employeename,
departmentid: res.hrmsemployeemovementregister.departmentid,
departmentiddesc: res.hrmsemployeemovementregister.departmentiddesc,
intime: intimeTime,
outtime: outtimeTime,
movementcategory: res.hrmsemployeemovementregister.movementcategory,
movementcategorydesc: res.hrmsemployeemovementregister.movementcategorydesc,
reason: res.hrmsemployeemovementregister.reason,
status: res.hrmsemployeemovementregister.status,
statusdesc: res.hrmsemployeemovementregister.statusdesc,
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
  for (let key in this.hrmsemployeemovementregisterForm.controls) {
    if (this.hrmsemployeemovementregisterForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeemovementregisterservice.formData!=null && this.hrmsemployeemovementregisterservice.formData[key]!=null  && this.hrmsemployeemovementregisterservice.formData[key]!='[]' && this.hrmsemployeemovementregisterservice.formData[key]!=undefined && this.hrmsemployeemovementregisterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeemovementregisterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeemovementregisterservice.formData!=null && this.hrmsemployeemovementregisterservice.formData[key]!=null   && this.hrmsemployeemovementregisterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeemovementregisterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeemovementregisterservice.formData!=null && this.hrmsemployeemovementregisterservice.formData[key]!=null   && this.hrmsemployeemovementregisterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeemovementregisterservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeemovementregisterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeemovementregisterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeemovementregisterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeemovementregisterForm.value;
obj.movementdate=new Date(this.hrmsemployeemovementregisterForm.get('movementdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeemovementregisterForm.get('movementdate').value)+'  UTC' :null);
obj.intime=(this.hrmsemployeemovementregisterForm.get('intime').value==null?0:this.hrmsemployeemovementregisterForm.get('intime').value.hour)+':'+(this.hrmsemployeemovementregisterForm.get('intime').value==null?0:this.hrmsemployeemovementregisterForm.get('intime').value.minute+":00");
obj.outtime=(this.hrmsemployeemovementregisterForm.get('outtime').value==null?0:this.hrmsemployeemovementregisterForm.get('outtime').value.hour)+':'+(this.hrmsemployeemovementregisterForm.get('outtime').value==null?0:this.hrmsemployeemovementregisterForm.get('outtime').value.minute+":00");
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

private hrmsemployeemovementregistertoggleOption(){
this.hrmsemployeemovementregistershowOption = this.hrmsemployeemovementregistershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeemovementregisterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeemovementregisterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeemovementregisterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeemovementregisterservice.formData=this.hrmsemployeemovementregisterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeemovementregisterForm.controls[key] != null)
    {
        this.hrmsemployeemovementregisterservice.formData[key] = this.hrmsemployeemovementregisterForm.controls[key].value;
    }
}
}
}
this.hrmsemployeemovementregisterservice.formData.movementdate=new Date(this.hrmsemployeemovementregisterForm.get('movementdate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeemovementregisterForm.get('movementdate').value)+'  UTC' :null);
this.hrmsemployeemovementregisterservice.formData.intime=(this.hrmsemployeemovementregisterForm.get('intime').value==null?0:this.hrmsemployeemovementregisterForm.get('intime').value.hour)+':'+(this.hrmsemployeemovementregisterForm.get('intime').value==null?0:this.hrmsemployeemovementregisterForm.get('intime').value.minute+":00");
this.hrmsemployeemovementregisterservice.formData.outtime=(this.hrmsemployeemovementregisterForm.get('outtime').value==null?0:this.hrmsemployeemovementregisterForm.get('outtime').value.hour)+':'+(this.hrmsemployeemovementregisterForm.get('outtime').value==null?0:this.hrmsemployeemovementregisterForm.get('outtime').value.minute+":00");
console.log(this.hrmsemployeemovementregisterservice.formData);
this.hrmsemployeemovementregisterservice.formData=this.hrmsemployeemovementregisterForm.value;
this.hrmsemployeemovementregisterservice.saveOrUpdatehrmsemployeemovementregisters().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeemovementregister);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeemovementregisterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeemovementregister);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeemovementregisterForm.markAsUntouched();
this.hrmsemployeemovementregisterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditemployeeid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsemployeemovementregisterForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsemployeemovementregisterForm.get('departmentid').value, ScreenType:2 }
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



