import { reclinkedrecordService } from './../../../service/reclinkedrecord.service';
import { reclinkedrecord } from './../../../model/reclinkedrecord.model';
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
import { recrecordmaster} from './../../../model/recrecordmaster.model';
import { recrecordmasterComponent } from './../../../pages/forms/recrecordmaster/recrecordmaster.component';
import { recrecordmasterService } from './../../../service/recrecordmaster.service';
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
selector: 'app-reclinkedrecord',
templateUrl: './reclinkedrecord.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class reclinkedrecordComponent implements OnInit {
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
bfilterPopulatereclinkedrecords:boolean=false;
datareclinkedrecordsrecordid3:any=[];
 reclinkedrecordForm: FormGroup;
recordidList: recrecordmaster[];
recordidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
recordid_recrecordmastersForm: FormGroup;//autocomplete
recordid_recrecordmastersoptions:any;//autocomplete
recordid_recrecordmastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
reclinkedrecordshowOption:boolean;
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
private reclinkedrecordservice: reclinkedrecordService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private recrecordmasterservice:recrecordmasterService,
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
this.reclinkedrecordForm  = this.fb.group({
pk:[null],
linkedrecordid: [null],
recordid: [null],
recordiddesc: [null],
fkrecordid: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.reclinkedrecordForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.reclinkedrecordForm.dirty && this.reclinkedrecordForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.linkedrecordid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.linkedrecordid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.linkedrecordid && pkDetail) {
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
let reclinkedrecordid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
  this.pkcol = this.sessionService.getItem('usersource');
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
this.formid=reclinkedrecordid;
//this.sharedService.alert(reclinkedrecordid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.recrecordmasterservice.getrecrecordmastersList().then(res => 
{
this.recordidList = res as recrecordmaster[];
if(this.reclinkedrecordservice.formData && this.reclinkedrecordservice.formData.recordid){
this.recordidoptionsEvent.emit(this.recordidList);
this.reclinkedrecordForm.patchValue({
    recordid: this.reclinkedrecordservice.formData.recordid,
    recordiddesc: this.reclinkedrecordservice.formData.recordiddesc,
});
}
{
let arrrecordid = this.recordidList.filter(v => v.recordid == this.reclinkedrecordForm.get('recordid').value);
let objrecordid;
if (arrrecordid.length > 0) objrecordid = arrrecordid[0];
if (objrecordid)
{
}
}
}
).catch((err) => {console.log(err);});
this.recordid_recrecordmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.recordidList.filter(v => v.referencenumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.recordid_recrecordmastersformatter = (result: any) => result.referencenumber;

//autocomplete
    this.reclinkedrecordservice.getreclinkedrecordsList().then(res => {
      this.pkList = res as reclinkedrecord[];
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
this.reclinkedrecordForm.markAsUntouched();
this.reclinkedrecordForm.markAsPristine();
}
onSelectedrecordid(recordidDetail: any) {
if (recordidDetail.recordid && recordidDetail) {
this.reclinkedrecordForm.patchValue({
recordid: recordidDetail.recordid,
recordiddesc: recordidDetail.referencenumber,

});

}
}




resetForm() {
if (this.reclinkedrecordForm != null)
this.reclinkedrecordForm.reset();
this.reclinkedrecordForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let linkedrecordid = this.reclinkedrecordForm.get('linkedrecordid').value;
        if(linkedrecordid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.reclinkedrecordservice.deletereclinkedrecord(linkedrecordid).then(res =>
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
    this.reclinkedrecordForm.patchValue({
        linkedrecordid: null
    });
    if(this.reclinkedrecordservice.formData.linkedrecordid!=null)this.reclinkedrecordservice.formData.linkedrecordid=null;
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
this.reclinkedrecordForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.reclinkedrecordForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.reclinkedrecordForm.controls[key]!=undefined)
{
this.reclinkedrecordForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
{
    this.onSubmitData(true);
}
else if( (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
linkedrecordidonChange(evt:any){
let e=evt.value;
}
recordidonChange(evt:any){
let e=evt.value;
}
fkrecordidonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editreclinkedrecords() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.reclinkedrecordservice.getreclinkedrecordsByEID(pkcol).then(res => {

this.reclinkedrecordservice.formData=res.reclinkedrecord;
let formproperty=res.reclinkedrecord.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.reclinkedrecord.pkcol;
this.formid=res.reclinkedrecord.linkedrecordid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.reclinkedrecordservice.formData=res.reclinkedrecord;
this.formid=res.reclinkedrecord.linkedrecordid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.reclinkedrecordForm.patchValue({
linkedrecordid: res.reclinkedrecord.linkedrecordid,
recordid: res.reclinkedrecord.recordid,
recordiddesc: res.reclinkedrecord.recordiddesc,
fkrecordid: res.reclinkedrecord.fkrecordid,
status: res.reclinkedrecord.status,
statusdesc: res.reclinkedrecord.statusdesc,
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
  for (let key in this.reclinkedrecordForm.controls) {
    if (this.reclinkedrecordForm.controls[key] != null) {
if(false)
{
if(this.reclinkedrecordservice.formData!=null && this.reclinkedrecordservice.formData[key]!=null  && this.reclinkedrecordservice.formData[key]!='[]' && this.reclinkedrecordservice.formData[key]!=undefined && this.reclinkedrecordservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.reclinkedrecordservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.reclinkedrecordservice.formData!=null && this.reclinkedrecordservice.formData[key]!=null   && this.reclinkedrecordservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.reclinkedrecordservice.formData[key]+"></div>");
}
else if(false)
{
if(this.reclinkedrecordservice.formData!=null && this.reclinkedrecordservice.formData[key]!=null   && this.reclinkedrecordservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.reclinkedrecordservice.formData[key]+"'><div class='progress__number'>"+this.reclinkedrecordservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.reclinkedrecordForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.reclinkedrecordForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.reclinkedrecordForm.value;
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

private reclinkedrecordtoggleOption(){
this.reclinkedrecordshowOption = this.reclinkedrecordshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.reclinkedrecordForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.reclinkedrecordForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.reclinkedrecordForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.reclinkedrecordservice.formData=this.reclinkedrecordForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.reclinkedrecordForm.controls[key] != null)
    {
        this.reclinkedrecordservice.formData[key] = this.reclinkedrecordForm.controls[key].value;
    }
}
}
}
console.log(this.reclinkedrecordservice.formData);
this.reclinkedrecordservice.formData=this.reclinkedrecordForm.value;
this.reclinkedrecordservice.saveOrUpdatereclinkedrecords().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).reclinkedrecord);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.reclinkedrecordservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).reclinkedrecord);
}
else
{
this.FillData(res);
}
}
this.reclinkedrecordForm.markAsUntouched();
this.reclinkedrecordForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditrecordid( recordid) {
/*let ScreenType='2';
this.dialog.open(recrecordmasterComponent, 
{
data: {recordid:this.reclinkedrecordForm.get('recordid').value, ScreenType:2 }
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



