import { boteammemberService } from './../../../service/boteammember.service';
import { boteammember } from './../../../model/boteammember.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { boteam} from './../../../model/boteam.model';
import { boteamService } from './../../../service/boteam.service';
//popups
import { bousermaster} from './../../../model/bousermaster.model';
import { bousermasterService } from './../../../service/bousermaster.service';
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
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-boteammember',
templateUrl: './boteammember.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boteammemberComponent implements OnInit {
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
bfilterPopulateboteammembers:boolean=false;
databoteammembersteamid3:any=[];
databoteammembersuserid3:any=[];
databoteammembersmemberstatus3:any=[];
 boteammemberForm: FormGroup;
teamidList: boteam[];
teamidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
teamid_boteamsForm: FormGroup;//autocomplete
teamid_boteamsoptions:any;//autocomplete
teamid_boteamsformatter:any;//autocomplete
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
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private boteammemberservice: boteammemberService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private boteamservice:boteamService,
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
this.boteammemberForm  = this.fb.group({pk:[null],teamid: [null],
teamiddesc: [null],
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

get f() { return this.boteammemberForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boteammemberForm.dirty && this.boteammemberForm.touched ) {
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

debugger;
let boteammemberid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
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
this.formid=boteammemberid;
//this.sharedService.alert(boteammemberid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.boteamservice.getboteamsList().then(res => 
{
this.teamidList = res as boteam[];
if(this.boteammemberservice.formData && this.boteammemberservice.formData.teamid){
this.teamidoptionsEvent.emit(this.teamidList);
this.boteammemberForm.patchValue({
    teamid: this.boteammemberservice.formData.teamid,
    teamiddesc: this.boteammemberservice.formData.teamiddesc,
});
}
{
let arrteamid = this.teamidList.filter(v => v.teamid == this.boteammemberForm.get('teamid').value);
let objteamid;
if (arrteamid.length > 0) objteamid = arrteamid[0];
if (objteamid)
{
}
}
}
).catch((err) => {console.log(err);});
this.teamid_boteamsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.teamidList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.teamid_boteamsformatter = (result: any) => result.description;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.useridList = res as bousermaster[];
if(this.boteammemberservice.formData && this.boteammemberservice.formData.userid){
this.useridoptionsEvent.emit(this.useridList);
this.boteammemberForm.patchValue({
    userid: this.boteammemberservice.formData.userid,
    useriddesc: this.boteammemberservice.formData.useriddesc,
});
}
{
let arruserid = this.useridList.filter(v => v.userid == this.boteammemberForm.get('userid').value);
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
    this.boteammemberservice.getboteammembersList().then(res => {
      this.pkList = res as boteammember[];
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
this.boteammemberForm.markAsUntouched();
this.boteammemberForm.markAsPristine();
}
onSelectedteamid(teamidDetail: any) {
if (teamidDetail.teamid && teamidDetail) {
this.boteammemberForm.patchValue({
teamid: teamidDetail.teamid,
teamiddesc: teamidDetail.description,

});

}
}

onSelecteduserid(useridDetail: any) {
if (useridDetail.userid && useridDetail) {
this.boteammemberForm.patchValue({
userid: useridDetail.userid,
useriddesc: useridDetail.username,

});

}
}




resetForm() {
if (this.boteammemberForm != null)
this.boteammemberForm.reset();
this.boteammemberForm.patchValue({
userid: this.sessiondata.userid,
useriddesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let teammemberid = this.boteammemberForm.get('teammemberid').value;
        if(teammemberid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boteammemberservice.deleteboteammember(teammemberid).then(res =>
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
    this.boteammemberForm.patchValue({
        teammemberid: null
    });
    if(this.boteammemberservice.formData.teammemberid!=null)this.boteammemberservice.formData.teammemberid=null;
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
this.boteammemberForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.boteammemberForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.boteammemberForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boteammemberForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boteammemberForm.controls[key]!=undefined)this.boteammemberForm.controls[key].disable({onlySelf: true});
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
teamidonChange(evt:any){
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
this.boteammemberForm.patchValue({memberstatusdesc:evt.options[evt.options.selectedIndex].text});
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.boteammemberservice.getboteammembersByEID(pkcol).then(res => {

this.boteammemberservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boteammember.teammemberid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boteammember.teammemberid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boteammemberForm.patchValue({
teamid: res.boteammember.teamid,
teamiddesc: res.boteammember.teamiddesc,
teammemberid: res.boteammember.teammemberid,
userid: res.boteammember.userid,
useriddesc: res.boteammember.useriddesc,
startdate: this.ngbDateParserFormatter.parse(res.boteammember.startdate),
enddate: this.ngbDateParserFormatter.parse(res.boteammember.enddate),
rateperhour: res.boteammember.rateperhour,
memberstatus: res.boteammember.memberstatus,
memberstatusdesc: res.boteammember.memberstatusdesc,
status: res.boteammember.status,
statusdesc: res.boteammember.statusdesc,
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
  for (let key in this.boteammemberForm.controls) {
    if (this.boteammemberForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boteammemberForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boteammemberForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.boteammemberForm.value;
obj.startdate=new Date(this.boteammemberForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.boteammemberForm.get('startdate').value)+'  UTC' :null);
obj.enddate=new Date(this.boteammemberForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.boteammemberForm.get('enddate').value)+'  UTC' :null);
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
Object.keys(this.boteammemberForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boteammemberForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boteammemberForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boteammemberservice.formData=this.boteammemberForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boteammemberForm.controls[key] != null)
    {
        this.boteammemberservice.formData[key] = this.boteammemberForm.controls[key].value;
    }
}
}
}
this.boteammemberservice.formData.startdate=new Date(this.boteammemberForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.boteammemberForm.get('startdate').value)+'  UTC' :null);
this.boteammemberservice.formData.enddate=new Date(this.boteammemberForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.boteammemberForm.get('enddate').value)+'  UTC' :null);
console.log(this.boteammemberservice.formData);
this.boteammemberservice.formData=this.boteammemberForm.value;
this.boteammemberservice.saveOrUpdateboteammembers().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boteammember);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boteammemberservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boteammember);
}
else
{
this.FillData(res);
}
}
this.boteammemberForm.markAsUntouched();
this.boteammemberForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditteamid( teamid) {
/*let ScreenType='2';
this.dialog.open(boteamComponent, 
{
data: {teamid:this.boteammemberForm.get('teamid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdituserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.boteammemberForm.get('userid').value, ScreenType:2 }
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



