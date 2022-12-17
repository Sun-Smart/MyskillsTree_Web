import { hrmspascheduleService } from './../../../service/hrmspaschedule.service';
import { hrmspaschedule } from './../../../model/hrmspaschedule.model';
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
//detail table services
import { hrmspadecisionmanagement } from './../../../model/hrmspadecisionmanagement.model';
import { hrmspadecisionmanagementComponent } from './../../../pages/forms/hrmspadecisionmanagement/hrmspadecisionmanagement.component';
//FK services
import { hrmsparesponse } from './../../../model/hrmsparesponse.model';
import { hrmsparesponseComponent } from './../../../pages/forms/hrmsparesponse/hrmsparesponse.component';
//FK services
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
selector: 'app-hrmspaschedule',
templateUrl: './hrmspaschedule.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmspascheduleComponent implements OnInit {
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
bfilterPopulatehrmspaschedules:boolean=false;
datahrmspaschedulesparound3:any=[];
datahrmspaschedulesappraisaluser3:any=[];
bfilterPopulatehrmspadecisionmanagements:boolean=false;
bfilterPopulatehrmsparesponses:boolean=false;
@ViewChild('tblhrmspadecisionmanagementssource',{static:false}) tblhrmspadecisionmanagementssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsparesponsessource',{static:false}) tblhrmsparesponsessource: Ng2SmartTableComponent;
 hrmspascheduleForm: FormGroup;
paroundList: boconfigvalue[];
appraisaluserList: bousermaster[];
appraisaluseroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
appraisaluser_bousermastersForm: FormGroup;//autocomplete
appraisaluser_bousermastersoptions:any;//autocomplete
appraisaluser_bousermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmspascheduleshowOption:boolean;
hrmspadecisionmanagementshowOption:boolean;
hrmsparesponseshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmspadecisionmanagementsvisiblelist:any;
hrmspadecisionmanagementshidelist:any;
hrmsparesponsesvisiblelist:any;
hrmsparesponseshidelist:any;

DeletedhrmspadecisionmanagementIDs: string="";
hrmspadecisionmanagementsID: string = "1";
hrmspadecisionmanagementsselectedindex:any;
DeletedhrmsparesponseIDs: string="";
hrmsparesponsesID: string = "2";
hrmsparesponsesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmspascheduleservice: hrmspascheduleService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
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
this.hrmspascheduleForm  = this.fb.group({
pk:[null],
paid: [null],
employeeid: [null],
planneddatetime: [null],
actualdatetime: [null],
paround: [null],
parounddesc: [null],
appraisaluser: [null],
appraisaluserdesc: [null],
appraisalusercomments: [null],
appraisalweightage: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmspascheduleForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmspascheduleForm.dirty && this.hrmspascheduleForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.paid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.paid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.paid && pkDetail) {
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
let hrmspascheduleid = null;

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
this.formid=hrmspascheduleid;
//this.sharedService.alert(hrmspascheduleid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmspadecisionmanagementsTableConfig();
  setTimeout(() => {
  this.SethrmspadecisionmanagementsTableddConfig();
  });

this.SethrmsparesponsesTableConfig();
  setTimeout(() => {
  this.SethrmsparesponsesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("paround").then(res => this.paroundList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.appraisaluserList = res as bousermaster[];
if(this.hrmspascheduleservice.formData && this.hrmspascheduleservice.formData.appraisaluser){
this.appraisaluseroptionsEvent.emit(this.appraisaluserList);
this.hrmspascheduleForm.patchValue({
    appraisaluser: this.hrmspascheduleservice.formData.appraisaluser,
    appraisaluserdesc: this.hrmspascheduleservice.formData.appraisaluserdesc,
});
}
{
let arrappraisaluser = this.appraisaluserList.filter(v => v.userid == this.hrmspascheduleForm.get('appraisaluser').value);
let objappraisaluser;
if (arrappraisaluser.length > 0) objappraisaluser = arrappraisaluser[0];
if (objappraisaluser)
{
}
}
}
).catch((err) => {console.log(err);});
this.appraisaluser_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.appraisaluserList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.appraisaluser_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.hrmspascheduleservice.gethrmspaschedulesList().then(res => {
      this.pkList = res as hrmspaschedule[];
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
this.hrmspascheduleForm.markAsUntouched();
this.hrmspascheduleForm.markAsPristine();
}
onSelectedappraisaluser(appraisaluserDetail: any) {
if (appraisaluserDetail.userid && appraisaluserDetail) {
this.hrmspascheduleForm.patchValue({
appraisaluser: appraisaluserDetail.userid,
appraisaluserdesc: appraisaluserDetail.username,

});

}
}




resetForm() {
if (this.hrmspascheduleForm != null)
this.hrmspascheduleForm.reset();
this.hrmspascheduleForm.patchValue({
appraisaluser: this.sessiondata.userid,
appraisaluserdesc: this.sessiondata.username,
});
setTimeout(() => {
this.hrmspascheduleservice.hrmspadecisionmanagements=[];
this.hrmspadecisionmanagementsLoadTable();
this.hrmspascheduleservice.hrmsparesponses=[];
this.hrmsparesponsesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let paid = this.hrmspascheduleForm.get('paid').value;
        if(paid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmspascheduleservice.deletehrmspaschedule(paid).then(res =>
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
    this.hrmspascheduleForm.patchValue({
        paid: null
    });
    if(this.hrmspascheduleservice.formData.paid!=null)this.hrmspascheduleservice.formData.paid=null;
for (let i=0;i<this.hrmspascheduleservice.hrmspadecisionmanagements.length;i++) {
this.hrmspascheduleservice.hrmspadecisionmanagements[i].appraisaldecisionid=null;
}
for (let i=0;i<this.hrmspascheduleservice.hrmsparesponses.length;i++) {
this.hrmspascheduleservice.hrmsparesponses[i].appraisalfeedbackid=null;
}
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
        else if(key=="planneddatetime")
this.hrmspascheduleForm.patchValue({"planneddatetime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="actualdatetime")
this.hrmspascheduleForm.patchValue({"actualdatetime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmspascheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmspascheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmspascheduleForm.controls[key]!=undefined)
{
this.hrmspascheduleForm.controls[key].disable({onlySelf: true});
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
paidonChange(evt:any){
let e=evt.value;
}
employeeidonChange(evt:any){
let e=evt.value;
}
planneddatetimeonChange(evt:any){
let e=evt.value;
}
actualdatetimeonChange(evt:any){
let e=evt.value;
}
paroundonChange(evt:any){
let e=this.f.paround.value as any;
this.hrmspascheduleForm.patchValue({parounddesc:evt.options[evt.options.selectedIndex].text});
}
appraisaluseronChange(evt:any){
let e=evt.value;
}
appraisalusercommentsonChange(evt:any){
let e=evt.value;
}
appraisalweightageonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmspaschedules() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmspascheduleservice.gethrmspaschedulesByEID(pkcol).then(res => {

this.hrmspascheduleservice.formData=res.hrmspaschedule;
let formproperty=res.hrmspaschedule.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmspaschedule.pkcol;
this.formid=res.hrmspaschedule.paid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmspaschedule.paid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmspascheduleForm.patchValue({
paid: res.hrmspaschedule.paid,
employeeid: res.hrmspaschedule.employeeid,
planneddatetime: this.ngbDateParserFormatter.parse(res.hrmspaschedule.planneddatetime),
actualdatetime: this.ngbDateParserFormatter.parse(res.hrmspaschedule.actualdatetime),
paround: res.hrmspaschedule.paround,
parounddesc: res.hrmspaschedule.parounddesc,
appraisaluser: res.hrmspaschedule.appraisaluser,
appraisaluserdesc: res.hrmspaschedule.appraisaluserdesc,
appraisalusercomments: res.hrmspaschedule.appraisalusercomments,
appraisalweightage: res.hrmspaschedule.appraisalweightage,
status: res.hrmspaschedule.status,
statusdesc: res.hrmspaschedule.statusdesc,
});
this.hrmspadecisionmanagementsvisiblelist=res.hrmspadecisionmanagementsvisiblelist;
this.hrmsparesponsesvisiblelist=res.hrmsparesponsesvisiblelist;
//Child Tables if any
this.hrmspascheduleservice.hrmspadecisionmanagements = res.hrmspadecisionmanagements;
this.SethrmspadecisionmanagementsTableConfig();
this.hrmspadecisionmanagementsLoadTable();
  setTimeout(() => {
  this.SethrmspadecisionmanagementsTableddConfig();
  });
this.hrmspascheduleservice.hrmsparesponses = res.hrmsparesponses;
this.SethrmsparesponsesTableConfig();
this.hrmsparesponsesLoadTable();
  setTimeout(() => {
  this.SethrmsparesponsesTableddConfig();
  });
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
  for (let key in this.hrmspascheduleForm.controls) {
    if (this.hrmspascheduleForm.controls[key] != null) {
if(false)
{
if(this.hrmspascheduleservice.formData!=null && this.hrmspascheduleservice.formData[key]!=null  && this.hrmspascheduleservice.formData[key]!='[]' && this.hrmspascheduleservice.formData[key]!=undefined && this.hrmspascheduleservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmspascheduleservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmspascheduleservice.formData!=null && this.hrmspascheduleservice.formData[key]!=null   && this.hrmspascheduleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmspascheduleservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmspascheduleservice.formData!=null && this.hrmspascheduleservice.formData[key]!=null   && this.hrmspascheduleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmspascheduleservice.formData[key]+"'><div class='progress__number'>"+this.hrmspascheduleservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmspascheduleForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmspascheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmspascheduleForm.value;
obj.planneddatetime=new Date(this.hrmspascheduleForm.get('planneddatetime').value ? this.ngbDateParserFormatter.format(this.hrmspascheduleForm.get('planneddatetime').value)+'  UTC' :null);
obj.actualdatetime=new Date(this.hrmspascheduleForm.get('actualdatetime').value ? this.ngbDateParserFormatter.format(this.hrmspascheduleForm.get('actualdatetime').value)+'  UTC' :null);
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

private hrmspascheduletoggleOption(){
this.hrmspascheduleshowOption = this.hrmspascheduleshowOption === true ? false : true;
}

private hrmspadecisionmanagementtoggleOption(){
this.hrmspadecisionmanagementshowOption = this.hrmspadecisionmanagementshowOption === true ? false : true;
}

private hrmsparesponsetoggleOption(){
this.hrmsparesponseshowOption = this.hrmsparesponseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmspascheduleForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmspascheduleForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmspascheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmspascheduleservice.formData=this.hrmspascheduleForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmspascheduleForm.controls[key] != null)
    {
        this.hrmspascheduleservice.formData[key] = this.hrmspascheduleForm.controls[key].value;
    }
}
}
}
this.hrmspascheduleservice.formData.planneddatetime=new Date(this.hrmspascheduleForm.get('planneddatetime').value ? this.ngbDateParserFormatter.format(this.hrmspascheduleForm.get('planneddatetime').value)+'  UTC' :null);
this.hrmspascheduleservice.formData.actualdatetime=new Date(this.hrmspascheduleForm.get('actualdatetime').value ? this.ngbDateParserFormatter.format(this.hrmspascheduleForm.get('actualdatetime').value)+'  UTC' :null);
this.hrmspascheduleservice.formData.DeletedhrmspadecisionmanagementIDs = this.DeletedhrmspadecisionmanagementIDs;
this.hrmspascheduleservice.formData.DeletedhrmsparesponseIDs = this.DeletedhrmsparesponseIDs;
console.log(this.hrmspascheduleservice.formData);
this.hrmspascheduleservice.formData=this.hrmspascheduleForm.value;
this.hrmspascheduleservice.saveOrUpdatehrmspaschedules().subscribe(
async res => {
if (this.hrmspadecisionmanagementssource.data)
{
    for (let i = 0; i < this.hrmspadecisionmanagementssource.data.length; i++)
    {
        if (this.hrmspadecisionmanagementssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmspadecisionmanagementssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsparesponsessource.data)
{
    for (let i = 0; i < this.hrmsparesponsessource.data.length; i++)
    {
        if (this.hrmsparesponsessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsparesponsessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmspaschedule);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmspascheduleservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmspaschedule);
}
else
{
this.FillData(res);
}
}
this.hrmspascheduleForm.markAsUntouched();
this.hrmspascheduleForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditappraisaluser( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmspascheduleForm.get('appraisaluser').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmspadecisionmanagement(event:any,appraisaldecisionid:any, paid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmspadecisionmanagementComponent, 
{
data:  {  showview:false,save:false,event,appraisaldecisionid, paid,visiblelist:this.hrmspadecisionmanagementsvisiblelist,  hidelist:this.hrmspadecisionmanagementshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmspadecisionmanagementssource.add(res);
this.hrmspadecisionmanagementssource.refresh();
}
else
{
this.hrmspadecisionmanagementssource.update(event.data, res);
}
}
});
}

onDeletehrmspadecisionmanagement(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmspadecisionmanagementIDs += childID + ",";
this.hrmspascheduleservice.hrmspadecisionmanagements.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsparesponse(event:any,appraisalfeedbackid:any, paid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsparesponseComponent, 
{
data:  {  showview:false,save:false,event,appraisalfeedbackid, paid,visiblelist:this.hrmsparesponsesvisiblelist,  hidelist:this.hrmsparesponseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsparesponsessource.add(res);
this.hrmsparesponsessource.refresh();
}
else
{
this.hrmsparesponsessource.update(event.data, res);
}
}
});
}

onDeletehrmsparesponse(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsparesponseIDs += childID + ",";
this.hrmspascheduleservice.hrmsparesponses.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmspadecisionmanagements
hrmspadecisionmanagementssettings:any;
hrmspadecisionmanagementssource: any;

showhrmspadecisionmanagementsCheckbox()
{
debugger;
if(this.tblhrmspadecisionmanagementssource.settings['selectMode']== 'multi')this.tblhrmspadecisionmanagementssource.settings['selectMode']= 'single';
else
this.tblhrmspadecisionmanagementssource.settings['selectMode']= 'multi';
this.tblhrmspadecisionmanagementssource.initGrid();
}
deletehrmspadecisionmanagementsAll()
{
this.tblhrmspadecisionmanagementssource.settings['selectMode'] = 'single';
}
showhrmspadecisionmanagementsFilter()
{
  setTimeout(() => {
  this.SethrmspadecisionmanagementsTableddConfig();
  });
      if(this.tblhrmspadecisionmanagementssource.settings!=null)this.tblhrmspadecisionmanagementssource.settings['hideSubHeader'] =!this.tblhrmspadecisionmanagementssource.settings['hideSubHeader'];
this.tblhrmspadecisionmanagementssource.initGrid();
}
showhrmspadecisionmanagementsInActive()
{
}
enablehrmspadecisionmanagementsInActive()
{
}
async SethrmspadecisionmanagementsTableddConfig()
{
if(!this.bfilterPopulatehrmspadecisionmanagements){
}
this.bfilterPopulatehrmspadecisionmanagements=true;
}
async hrmspadecisionmanagementsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmspadecisionmanagementsTableConfig()
{
this.hrmspadecisionmanagementssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
changeinrole: {
title: 'Changein Role',
type: 'number',
filter:true,
},
salarychange: {
title: 'Salary Change',
type: 'number',
filter:true,
},
effectivedate: {
title: 'Effective Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
},
};
}
hrmspadecisionmanagementsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmspadecisionmanagementsID)>=0)
{
this.hrmspadecisionmanagementssource=new LocalDataSource();
this.hrmspadecisionmanagementssource.load(this.hrmspascheduleservice.hrmspadecisionmanagements as  any as LocalDataSource);
this.hrmspadecisionmanagementssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmspadecisionmanagementsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmspascheduleservice.hrmspadecisionmanagements.length == 0)
{
    this.tblhrmspadecisionmanagementssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmspadecisionmanagement();
    this.hrmspascheduleservice.hrmspadecisionmanagements.push(obj);
    this.hrmspadecisionmanagementssource.refresh();
    if ((this.hrmspascheduleservice.hrmspadecisionmanagements.length / this.hrmspadecisionmanagementssource.getPaging().perPage).toFixed(0) + 1 != this.hrmspadecisionmanagementssource.getPaging().page)
    {
        this.hrmspadecisionmanagementssource.setPage((this.hrmspascheduleservice.hrmspadecisionmanagements.length / this.hrmspadecisionmanagementssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmspadecisionmanagementssource.grid.edit(this.tblhrmspadecisionmanagementssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmspadecisionmanagementssource.data.indexOf(event.data);
this.onDeletehrmspadecisionmanagement(event,event.data.appraisaldecisionid,((this.hrmspadecisionmanagementssource.getPaging().page-1) *this.hrmspadecisionmanagementssource.getPaging().perPage)+index);
this.hrmspadecisionmanagementssource.refresh();
break;
}
}

*/
hrmspadecisionmanagementsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmspadecisionmanagement(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmspadecisionmanagement(event,event.data.appraisaldecisionid,this.formid);
break;
case 'delete':
this.onDeletehrmspadecisionmanagement(event,event.data.appraisaldecisionid,((this.hrmspadecisionmanagementssource.getPaging().page-1) *this.hrmspadecisionmanagementssource.getPaging().perPage)+event.index);
this.hrmspadecisionmanagementssource.refresh();
break;
}
}
hrmspadecisionmanagementsonDelete(obj) {
let appraisaldecisionid=obj.data.appraisaldecisionid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmspascheduleservice.deletehrmspaschedule(appraisaldecisionid).then(res=>
this.hrmspadecisionmanagementsLoadTable()
);
}
}
hrmspadecisionmanagementsPaging(val)
{
debugger;
this.hrmspadecisionmanagementssource.setPaging(1, val, true);
}

handlehrmspadecisionmanagementsGridSelected(event:any) {
this.hrmspadecisionmanagementsselectedindex=this.hrmspascheduleservice.hrmspadecisionmanagements.findIndex(i => i.appraisaldecisionid === event.data.appraisaldecisionid);
}
IshrmspadecisionmanagementsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmspadecisionmanagementsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmspadecisionmanagements
//start of Grid Codes hrmsparesponses
hrmsparesponsessettings:any;
hrmsparesponsessource: any;

showhrmsparesponsesCheckbox()
{
debugger;
if(this.tblhrmsparesponsessource.settings['selectMode']== 'multi')this.tblhrmsparesponsessource.settings['selectMode']= 'single';
else
this.tblhrmsparesponsessource.settings['selectMode']= 'multi';
this.tblhrmsparesponsessource.initGrid();
}
deletehrmsparesponsesAll()
{
this.tblhrmsparesponsessource.settings['selectMode'] = 'single';
}
showhrmsparesponsesFilter()
{
  setTimeout(() => {
  this.SethrmsparesponsesTableddConfig();
  });
      if(this.tblhrmsparesponsessource.settings!=null)this.tblhrmsparesponsessource.settings['hideSubHeader'] =!this.tblhrmsparesponsessource.settings['hideSubHeader'];
this.tblhrmsparesponsessource.initGrid();
}
showhrmsparesponsesInActive()
{
}
enablehrmsparesponsesInActive()
{
}
async SethrmsparesponsesTableddConfig()
{
if(!this.bfilterPopulatehrmsparesponses){
}
this.bfilterPopulatehrmsparesponses=true;
}
async hrmsparesponsesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsparesponsesTableConfig()
{
this.hrmsparesponsessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
qmid: {
title: 'Q M',
type: 'number',
filter:true,
},
answer: {
title: 'Answer',
type: '',
filter:true,
},
rating: {
title: 'Rating',
type: 'number',
filter:true,
},
},
};
}
hrmsparesponsesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsparesponsesID)>=0)
{
this.hrmsparesponsessource=new LocalDataSource();
this.hrmsparesponsessource.load(this.hrmspascheduleservice.hrmsparesponses as  any as LocalDataSource);
this.hrmsparesponsessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsparesponsesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmspascheduleservice.hrmsparesponses.length == 0)
{
    this.tblhrmsparesponsessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsparesponse();
    this.hrmspascheduleservice.hrmsparesponses.push(obj);
    this.hrmsparesponsessource.refresh();
    if ((this.hrmspascheduleservice.hrmsparesponses.length / this.hrmsparesponsessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsparesponsessource.getPaging().page)
    {
        this.hrmsparesponsessource.setPage((this.hrmspascheduleservice.hrmsparesponses.length / this.hrmsparesponsessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsparesponsessource.grid.edit(this.tblhrmsparesponsessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsparesponsessource.data.indexOf(event.data);
this.onDeletehrmsparesponse(event,event.data.appraisalfeedbackid,((this.hrmsparesponsessource.getPaging().page-1) *this.hrmsparesponsessource.getPaging().perPage)+index);
this.hrmsparesponsessource.refresh();
break;
}
}

*/
hrmsparesponsesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsparesponse(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsparesponse(event,event.data.appraisalfeedbackid,this.formid);
break;
case 'delete':
this.onDeletehrmsparesponse(event,event.data.appraisalfeedbackid,((this.hrmsparesponsessource.getPaging().page-1) *this.hrmsparesponsessource.getPaging().perPage)+event.index);
this.hrmsparesponsessource.refresh();
break;
}
}
hrmsparesponsesonDelete(obj) {
let appraisalfeedbackid=obj.data.appraisalfeedbackid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmspascheduleservice.deletehrmspaschedule(appraisalfeedbackid).then(res=>
this.hrmsparesponsesLoadTable()
);
}
}
hrmsparesponsesPaging(val)
{
debugger;
this.hrmsparesponsessource.setPaging(1, val, true);
}

handlehrmsparesponsesGridSelected(event:any) {
this.hrmsparesponsesselectedindex=this.hrmspascheduleservice.hrmsparesponses.findIndex(i => i.appraisalfeedbackid === event.data.appraisalfeedbackid);
}
IshrmsparesponsesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsparesponsesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsparesponses

}



