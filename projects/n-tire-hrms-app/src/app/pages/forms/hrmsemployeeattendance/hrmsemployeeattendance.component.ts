import { hrmsemployeeattendanceService } from './../../../service/hrmsemployeeattendance.service';
import { hrmsemployeeattendance } from './../../../model/hrmsemployeeattendance.model';
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
selector: 'app-hrmsemployeeattendance',
templateUrl: './hrmsemployeeattendance.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsemployeeattendanceComponent implements OnInit {
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
bfilterPopulatehrmsemployeeattendances:boolean=false;
 hrmsemployeeattendanceForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsemployeeattendanceshowOption:boolean;
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
private hrmsemployeeattendanceservice: hrmsemployeeattendanceService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.hrmsemployeeattendanceForm  = this.fb.group({
pk:[null],
txnid: [null],
txndate: [null],
employeeid: [null],
intime: [null],
outtime: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsemployeeattendanceForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsemployeeattendanceForm.dirty && this.hrmsemployeeattendanceForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.txnid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.txnid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.txnid && pkDetail) {
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
let hrmsemployeeattendanceid = null;

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
this.formid=hrmsemployeeattendanceid;
//this.sharedService.alert(hrmsemployeeattendanceid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.hrmsemployeeattendanceservice.gethrmsemployeeattendancesList().then(res => {
      this.pkList = res as hrmsemployeeattendance[];
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
this.hrmsemployeeattendanceForm.markAsUntouched();
this.hrmsemployeeattendanceForm.markAsPristine();
}



resetForm() {
if (this.hrmsemployeeattendanceForm != null)
this.hrmsemployeeattendanceForm.reset();
this.hrmsemployeeattendanceForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let txnid = this.hrmsemployeeattendanceForm.get('txnid').value;
        if(txnid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsemployeeattendanceservice.deletehrmsemployeeattendance(txnid).then(res =>
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
    this.hrmsemployeeattendanceForm.patchValue({
        txnid: null
    });
    if(this.hrmsemployeeattendanceservice.formData.txnid!=null)this.hrmsemployeeattendanceservice.formData.txnid=null;
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
        else if(key=="txndate")
this.hrmsemployeeattendanceForm.patchValue({"txndate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="intime")
this.hrmsemployeeattendanceForm.patchValue({"intime":new Time(mainscreendata[key]) });
        else if(key=="outtime")
this.hrmsemployeeattendanceForm.patchValue({"outtime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsemployeeattendanceForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsemployeeattendanceForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsemployeeattendanceForm.controls[key]!=undefined)
{
this.hrmsemployeeattendanceForm.controls[key].disable({onlySelf: true});
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

edithrmsemployeeattendances() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsemployeeattendanceservice.gethrmsemployeeattendancesByEID(pkcol).then(res => {

this.hrmsemployeeattendanceservice.formData=res.hrmsemployeeattendance;
let formproperty=res.hrmsemployeeattendance.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsemployeeattendance.pkcol;
this.formid=res.hrmsemployeeattendance.txnid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsemployeeattendance.txnid;
var intimeTime=new Time( res.hrmsemployeeattendance.intime);
var outtimeTime=new Time( res.hrmsemployeeattendance.outtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsemployeeattendanceForm.patchValue({
txnid: res.hrmsemployeeattendance.txnid,
txndate: this.ngbDateParserFormatter.parse(res.hrmsemployeeattendance.txndate),
employeeid: res.hrmsemployeeattendance.employeeid,
intime: intimeTime,
outtime: outtimeTime,
status: res.hrmsemployeeattendance.status,
statusdesc: res.hrmsemployeeattendance.statusdesc,
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
  for (let key in this.hrmsemployeeattendanceForm.controls) {
    if (this.hrmsemployeeattendanceForm.controls[key] != null) {
if(false)
{
if(this.hrmsemployeeattendanceservice.formData!=null && this.hrmsemployeeattendanceservice.formData[key]!=null  && this.hrmsemployeeattendanceservice.formData[key]!='[]' && this.hrmsemployeeattendanceservice.formData[key]!=undefined && this.hrmsemployeeattendanceservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsemployeeattendanceservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsemployeeattendanceservice.formData!=null && this.hrmsemployeeattendanceservice.formData[key]!=null   && this.hrmsemployeeattendanceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsemployeeattendanceservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsemployeeattendanceservice.formData!=null && this.hrmsemployeeattendanceservice.formData[key]!=null   && this.hrmsemployeeattendanceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsemployeeattendanceservice.formData[key]+"'><div class='progress__number'>"+this.hrmsemployeeattendanceservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsemployeeattendanceForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsemployeeattendanceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsemployeeattendanceForm.value;
obj.txndate=new Date(this.hrmsemployeeattendanceForm.get('txndate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeattendanceForm.get('txndate').value)+'  UTC' :null);
obj.intime=(this.hrmsemployeeattendanceForm.get('intime').value==null?0:this.hrmsemployeeattendanceForm.get('intime').value.hour)+':'+(this.hrmsemployeeattendanceForm.get('intime').value==null?0:this.hrmsemployeeattendanceForm.get('intime').value.minute+":00");
obj.outtime=(this.hrmsemployeeattendanceForm.get('outtime').value==null?0:this.hrmsemployeeattendanceForm.get('outtime').value.hour)+':'+(this.hrmsemployeeattendanceForm.get('outtime').value==null?0:this.hrmsemployeeattendanceForm.get('outtime').value.minute+":00");
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

private hrmsemployeeattendancetoggleOption(){
this.hrmsemployeeattendanceshowOption = this.hrmsemployeeattendanceshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsemployeeattendanceForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsemployeeattendanceForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsemployeeattendanceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsemployeeattendanceservice.formData=this.hrmsemployeeattendanceForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsemployeeattendanceForm.controls[key] != null)
    {
        this.hrmsemployeeattendanceservice.formData[key] = this.hrmsemployeeattendanceForm.controls[key].value;
    }
}
}
}
this.hrmsemployeeattendanceservice.formData.txndate=new Date(this.hrmsemployeeattendanceForm.get('txndate').value ? this.ngbDateParserFormatter.format(this.hrmsemployeeattendanceForm.get('txndate').value)+'  UTC' :null);
this.hrmsemployeeattendanceservice.formData.intime=(this.hrmsemployeeattendanceForm.get('intime').value==null?0:this.hrmsemployeeattendanceForm.get('intime').value.hour)+':'+(this.hrmsemployeeattendanceForm.get('intime').value==null?0:this.hrmsemployeeattendanceForm.get('intime').value.minute+":00");
this.hrmsemployeeattendanceservice.formData.outtime=(this.hrmsemployeeattendanceForm.get('outtime').value==null?0:this.hrmsemployeeattendanceForm.get('outtime').value.hour)+':'+(this.hrmsemployeeattendanceForm.get('outtime').value==null?0:this.hrmsemployeeattendanceForm.get('outtime').value.minute+":00");
console.log(this.hrmsemployeeattendanceservice.formData);
this.hrmsemployeeattendanceservice.formData=this.hrmsemployeeattendanceForm.value;
this.hrmsemployeeattendanceservice.saveOrUpdatehrmsemployeeattendances().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeeattendance);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsemployeeattendanceservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsemployeeattendance);
}
else
{
this.FillData(res);
}
}
this.hrmsemployeeattendanceForm.markAsUntouched();
this.hrmsemployeeattendanceForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



