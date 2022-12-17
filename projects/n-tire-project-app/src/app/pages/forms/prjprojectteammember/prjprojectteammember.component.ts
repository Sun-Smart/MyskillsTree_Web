import { prjprojectteammemberService } from './../../../service/prjprojectteammember.service';
import { prjprojectteammember } from './../../../model/prjprojectteammember.model';
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
import { prjprojectmaster} from './../../../model/prjprojectmaster.model';
import { prjprojectmasterComponent } from './../../../pages/forms/prjprojectmaster/prjprojectmaster.component';
import { prjprojectmasterService } from './../../../service/prjprojectmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-prjprojectteammember',
templateUrl: './prjprojectteammember.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class prjprojectteammemberComponent implements OnInit {
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
bfilterPopulateprjprojectteammembers:boolean=false;
dataprjprojectteammembersprojectid3:any=[];
dataprjprojectteammembersuserid3:any=[];
dataprjprojectteammembersmemberstatus3:any=[];
 prjprojectteammemberForm: FormGroup;
projectidList: prjprojectmaster[];
projectidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
projectid_prjprojectmastersForm: FormGroup;//autocomplete
projectid_prjprojectmastersoptions:any;//autocomplete
projectid_prjprojectmastersformatter:any;//autocomplete
useridList: bousermaster[];
useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
userid_bousermastersForm: FormGroup;//autocomplete
userid_bousermastersoptions:any;//autocomplete
userid_bousermastersformatter:any;//autocomplete
memberstatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
prjprojectteammembershowOption:boolean;
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
private prjprojectteammemberservice: prjprojectteammemberService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private prjprojectmasterservice:prjprojectmasterService,
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
this.prjprojectteammemberForm  = this.fb.group({
pk:[null],
projectid: [null],
projectiddesc: [null],
teammemberid: [null],
userid: [null],
useriddesc: [null],
startdate: [null],
enddate: [null],
rateperhour: [null],
memberstatus: [null],
memberstatusdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.prjprojectteammemberForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.prjprojectteammemberForm.dirty && this.prjprojectteammemberForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.teammemberid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.teammemberid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.teammemberid && pkDetail) {
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
let prjprojectteammemberid = null;

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
this.formid=prjprojectteammemberid;
//this.sharedService.alert(prjprojectteammemberid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.prjprojectmasterservice.getprjprojectmastersList().then(res => 
{
this.projectidList = res as prjprojectmaster[];
if(this.prjprojectteammemberservice.formData && this.prjprojectteammemberservice.formData.projectid){
this.projectidoptionsEvent.emit(this.projectidList);
this.prjprojectteammemberForm.patchValue({
    projectid: this.prjprojectteammemberservice.formData.projectid,
    projectiddesc: this.prjprojectteammemberservice.formData.projectiddesc,
});
}
{
let arrprojectid = this.projectidList.filter(v => v.projectid == this.prjprojectteammemberForm.get('projectid').value);
let objprojectid;
if (arrprojectid.length > 0) objprojectid = arrprojectid[0];
if (objprojectid)
{
}
}
}
).catch((err) => {console.log(err);});
this.projectid_prjprojectmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.projectidList.filter(v => v.projectname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.projectid_prjprojectmastersformatter = (result: any) => result.projectname;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.useridList = res as bousermaster[];
if(this.prjprojectteammemberservice.formData && this.prjprojectteammemberservice.formData.userid){
this.useridoptionsEvent.emit(this.useridList);
this.prjprojectteammemberForm.patchValue({
    userid: this.prjprojectteammemberservice.formData.userid,
    useriddesc: this.prjprojectteammemberservice.formData.useriddesc,
});
}
{
let arruserid = this.useridList.filter(v => v.userid == this.prjprojectteammemberForm.get('userid').value);
let objuserid;
if (arruserid.length > 0) objuserid = arruserid[0];
if (objuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.userid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.useridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.userid_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("memberstatus").then(res => this.memberstatusList = res as boconfigvalue[]);

//autocomplete
    this.prjprojectteammemberservice.getprjprojectteammembersList().then(res => {
      this.pkList = res as prjprojectteammember[];
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
this.prjprojectteammemberForm.markAsUntouched();
this.prjprojectteammemberForm.markAsPristine();
}
onSelectedprojectid(projectidDetail: any) {
if (projectidDetail.projectid && projectidDetail) {
this.prjprojectteammemberForm.patchValue({
projectid: projectidDetail.projectid,
projectiddesc: projectidDetail.projectname,

});

}
}

onSelecteduserid(useridDetail: any) {
if (useridDetail.userid && useridDetail) {
this.prjprojectteammemberForm.patchValue({
userid: useridDetail.userid,
useriddesc: useridDetail.username,

});

}
}




resetForm() {
if (this.prjprojectteammemberForm != null)
this.prjprojectteammemberForm.reset();
this.prjprojectteammemberForm.patchValue({
userid: this.sessiondata.userid,
useriddesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let teammemberid = this.prjprojectteammemberForm.get('teammemberid').value;
        if(teammemberid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.prjprojectteammemberservice.deleteprjprojectteammember(teammemberid).then(res =>
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
    this.prjprojectteammemberForm.patchValue({
        teammemberid: null
    });
    if(this.prjprojectteammemberservice.formData.teammemberid!=null)this.prjprojectteammemberservice.formData.teammemberid=null;
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
        else if(key=="startdate")
this.prjprojectteammemberForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.prjprojectteammemberForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.prjprojectteammemberForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.prjprojectteammemberForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.prjprojectteammemberForm.controls[key]!=undefined)
{
this.prjprojectteammemberForm.controls[key].disable({onlySelf: true});
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
projectidonChange(evt:any){
let e=evt.value;
}
teammemberidonChange(evt:any){
let e=evt.value;
}
useridonChange(evt:any){
let e=evt.value;
}
startdateonChange(evt:any){
let e=evt.value;
}
enddateonChange(evt:any){
let e=evt.value;
}
rateperhouronChange(evt:any){
let e=evt.value;
}
memberstatusonChange(evt:any){
let e=this.f.memberstatus.value as any;
this.prjprojectteammemberForm.patchValue({memberstatusdesc:evt.options[evt.options.selectedIndex].text});
}
statusonChange(evt:any){
let e=evt.value;
}

editprjprojectteammembers() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.prjprojectteammemberservice.getprjprojectteammembersByEID(pkcol).then(res => {

this.prjprojectteammemberservice.formData=res.prjprojectteammember;
let formproperty=res.prjprojectteammember.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.prjprojectteammember.pkcol;
this.formid=res.prjprojectteammember.teammemberid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.prjprojectteammember.teammemberid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.prjprojectteammemberForm.patchValue({
projectid: res.prjprojectteammember.projectid,
projectiddesc: res.prjprojectteammember.projectiddesc,
teammemberid: res.prjprojectteammember.teammemberid,
userid: res.prjprojectteammember.userid,
useriddesc: res.prjprojectteammember.useriddesc,
startdate: this.ngbDateParserFormatter.parse(res.prjprojectteammember.startdate),
enddate: this.ngbDateParserFormatter.parse(res.prjprojectteammember.enddate),
rateperhour: res.prjprojectteammember.rateperhour,
memberstatus: res.prjprojectteammember.memberstatus,
memberstatusdesc: res.prjprojectteammember.memberstatusdesc,
status: res.prjprojectteammember.status,
statusdesc: res.prjprojectteammember.statusdesc,
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
  for (let key in this.prjprojectteammemberForm.controls) {
    if (this.prjprojectteammemberForm.controls[key] != null) {
if(false)
{
if(this.prjprojectteammemberservice.formData!=null && this.prjprojectteammemberservice.formData[key]!=null  && this.prjprojectteammemberservice.formData[key]!='[]' && this.prjprojectteammemberservice.formData[key]!=undefined && this.prjprojectteammemberservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.prjprojectteammemberservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.prjprojectteammemberservice.formData!=null && this.prjprojectteammemberservice.formData[key]!=null   && this.prjprojectteammemberservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.prjprojectteammemberservice.formData[key]+"></div>");
}
else if(false)
{
if(this.prjprojectteammemberservice.formData!=null && this.prjprojectteammemberservice.formData[key]!=null   && this.prjprojectteammemberservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.prjprojectteammemberservice.formData[key]+"'><div class='progress__number'>"+this.prjprojectteammemberservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjprojectteammemberForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.prjprojectteammemberForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.prjprojectteammemberForm.value;
obj.startdate=new Date(this.prjprojectteammemberForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.prjprojectteammemberForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.prjprojectteammemberForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.prjprojectteammemberForm.get('enddate').value)+'  UTC' :null);
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

private prjprojectteammembertoggleOption(){
this.prjprojectteammembershowOption = this.prjprojectteammembershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.prjprojectteammemberForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjprojectteammemberForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjprojectteammemberForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.prjprojectteammemberservice.formData=this.prjprojectteammemberForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjprojectteammemberForm.controls[key] != null)
    {
        this.prjprojectteammemberservice.formData[key] = this.prjprojectteammemberForm.controls[key].value;
    }
}
}
}
this.prjprojectteammemberservice.formData.startdate=new Date(this.prjprojectteammemberForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.prjprojectteammemberForm.get('startdate').value)+'  UTC' :null);
this.prjprojectteammemberservice.formData.enddate=new Date(this.prjprojectteammemberForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.prjprojectteammemberForm.get('enddate').value)+'  UTC' :null);
console.log(this.prjprojectteammemberservice.formData);
this.prjprojectteammemberservice.formData=this.prjprojectteammemberForm.value;
this.prjprojectteammemberservice.saveOrUpdateprjprojectteammembers().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).prjprojectteammember);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.prjprojectteammemberservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).prjprojectteammember);
}
else
{
this.FillData(res);
}
}
this.prjprojectteammemberForm.markAsUntouched();
this.prjprojectteammemberForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditprojectid( projectid) {
/*let ScreenType='2';
this.dialog.open(prjprojectmasterComponent, 
{
data: {projectid:this.prjprojectteammemberForm.get('projectid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdituserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.prjprojectteammemberForm.get('userid').value, ScreenType:2 }
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



