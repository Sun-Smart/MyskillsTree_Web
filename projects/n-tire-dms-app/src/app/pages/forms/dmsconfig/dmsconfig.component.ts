import { dmsconfigService } from './../../../service/dmsconfig.service';
import { dmsconfig } from './../../../model/dmsconfig.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bodynamicform} from '../../../../../../n-tire-bo-app/src/app/model/bodynamicform.model';
import { bodynamicformComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bodynamicform/bodynamicform.component';
import { bodynamicformService } from '../../../../../../n-tire-bo-app/src/app/service/bodynamicform.service';
//popups
import { dmsfolder} from './../../../model/dmsfolder.model';
import { dmsfolderComponent } from './../../../pages/forms/dmsfolder/dmsfolder.component';
import { dmsfolderService } from './../../../service/dmsfolder.service';
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
selector: 'app-dmsconfig',
templateUrl: './dmsconfig.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class dmsconfigComponent implements OnInit {
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
bfilterPopulatedmsconfigs:boolean=false;
datadmsconfigstype3:any=[];
datadmsconfigsdepartmentid3:any=[];
datadmsconfigscustomfieldid3:any=[];
datadmsconfigsfolderid3:any=[];
datadmsconfigsarchiveperiod3:any=[];
datadmsconfigsarchivetype3:any=[];
 dmsconfigForm: FormGroup;
typeList: boconfigvalue[];
departmentidList: bomasterdata[];
customfieldidList: bodynamicform[];
folderidList: dmsfolder[];
archiveperiodList: boconfigvalue[];
archivetypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
dmsconfigshowOption:boolean;
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
private dmsconfigservice: dmsconfigService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private bodynamicformservice:bodynamicformService,
private dmsfolderservice:dmsfolderService,
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
this.dmsconfigForm  = this.fb.group({
pk:[null],
configid: [null],
name: [null],
parentid: [null],
type: [null],
typedesc: [null],
departmentid: [null],
departmentiddesc: [null],
customfieldid: [null],
customfieldiddesc: [null],
folderid: [null],
folderiddesc: [null],
maxfilesize: [null],
subscriptionallowed: [null],
subscriptionalert: [null],
recordlocation: [null],
archivedays: [null],
archiveperiod: [null],
archiveperioddesc: [null],
archivetype: [null],
archivetypedesc: [null],
canview: [null],
canedit: [null],
candownload: [null],
newalert: [null],
viewalert: [null],
editalert: [null],
downloadalert: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.dmsconfigForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.dmsconfigForm.dirty && this.dmsconfigForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.configid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.configid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.configid && pkDetail) {
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
let dmsconfigid = null;

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
this.formid=dmsconfigid;
//this.sharedService.alert(dmsconfigid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("type").then(res => this.typeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bodynamicformservice.getbodynamicformsList().then(res => 
{
this.customfieldidList = res as bodynamicform[];
}
).catch((err) => {console.log(err);});
this.dmsfolderservice.getdmsfoldersList().then(res => 
{
this.folderidList = res as dmsfolder[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("archiveperiod").then(res => this.archiveperiodList = res as boconfigvalue[]);
this.configservice.getList("archivetype").then(res => this.archivetypeList = res as boconfigvalue[]);

//autocomplete
    this.dmsconfigservice.getdmsconfigsList().then(res => {
      this.pkList = res as dmsconfig[];
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
this.dmsconfigForm.markAsUntouched();
this.dmsconfigForm.markAsPristine();
}



resetForm() {
if (this.dmsconfigForm != null)
this.dmsconfigForm.reset();
this.dmsconfigForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let configid = this.dmsconfigForm.get('configid').value;
        if(configid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.dmsconfigservice.deletedmsconfig(configid).then(res =>
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
    this.dmsconfigForm.patchValue({
        configid: null
    });
    if(this.dmsconfigservice.formData.configid!=null)this.dmsconfigservice.formData.configid=null;
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
this.dmsconfigForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.dmsconfigForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.dmsconfigForm.controls[key]!=undefined)
{
this.dmsconfigForm.controls[key].disable({onlySelf: true});
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
configidonChange(evt:any){
let e=evt.value;
}
nameonChange(evt:any){
let e=evt.value;
}
parentidonChange(evt:any){
let e=evt.value;
}
typeonChange(evt:any){
let e=this.f.type.value as any;
this.dmsconfigForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
departmentidonChange(evt:any){
let e=evt.value;
this.dmsconfigForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
customfieldidonChange(evt:any){
let e=evt.value;
this.dmsconfigForm.patchValue({customfieldiddesc:evt.options[evt.options.selectedIndex].text});
}
folderidonChange(evt:any){
let e=evt.value;
this.dmsconfigForm.patchValue({folderiddesc:evt.options[evt.options.selectedIndex].text});
}
maxfilesizeonChange(evt:any){
let e=evt.value;
}
subscriptionallowedonChange(evt:any){
let e=evt.value;
}
subscriptionalertonChange(evt:any){
let e=evt.value;
}
recordlocationonChange(evt:any){
let e=evt.value;
}
archivedaysonChange(evt:any){
let e=evt.value;
}
archiveperiodonChange(evt:any){
let e=this.f.archiveperiod.value as any;
this.dmsconfigForm.patchValue({archiveperioddesc:evt.options[evt.options.selectedIndex].text});
}
archivetypeonChange(evt:any){
let e=this.f.archivetype.value as any;
this.dmsconfigForm.patchValue({archivetypedesc:evt.options[evt.options.selectedIndex].text});
}
canviewonChange(evt:any){
let e=evt.value;
}
caneditonChange(evt:any){
let e=evt.value;
}
candownloadonChange(evt:any){
let e=evt.value;
}
newalertonChange(evt:any){
let e=evt.value;
}
viewalertonChange(evt:any){
let e=evt.value;
}
editalertonChange(evt:any){
let e=evt.value;
}
downloadalertonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editdmsconfigs() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.dmsconfigservice.getdmsconfigsByEID(pkcol).then(res => {

this.dmsconfigservice.formData=res.dmsconfig;
let formproperty=res.dmsconfig.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.dmsconfig.pkcol;
this.formid=res.dmsconfig.configid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.dmsconfigservice.formData=res.dmsconfig;
this.formid=res.dmsconfig.configid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.dmsconfigForm.patchValue({
configid: res.dmsconfig.configid,
name: res.dmsconfig.name,
parentid: res.dmsconfig.parentid,
type: res.dmsconfig.type,
typedesc: res.dmsconfig.typedesc,
departmentid: res.dmsconfig.departmentid,
departmentiddesc: res.dmsconfig.departmentiddesc,
customfieldid: res.dmsconfig.customfieldid,
customfieldiddesc: res.dmsconfig.customfieldiddesc,
folderid: res.dmsconfig.folderid,
folderiddesc: res.dmsconfig.folderiddesc,
maxfilesize: res.dmsconfig.maxfilesize,
subscriptionallowed: res.dmsconfig.subscriptionallowed,
subscriptionalert: res.dmsconfig.subscriptionalert,
recordlocation: res.dmsconfig.recordlocation,
archivedays: res.dmsconfig.archivedays,
archiveperiod: res.dmsconfig.archiveperiod,
archiveperioddesc: res.dmsconfig.archiveperioddesc,
archivetype: res.dmsconfig.archivetype,
archivetypedesc: res.dmsconfig.archivetypedesc,
canview: res.dmsconfig.canview,
canedit: res.dmsconfig.canedit,
candownload: res.dmsconfig.candownload,
newalert: res.dmsconfig.newalert,
viewalert: res.dmsconfig.viewalert,
editalert: res.dmsconfig.editalert,
downloadalert: res.dmsconfig.downloadalert,
status: res.dmsconfig.status,
statusdesc: res.dmsconfig.statusdesc,
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
  for (let key in this.dmsconfigForm.controls) {
    if (this.dmsconfigForm.controls[key] != null) {
if(false)
{
if(this.dmsconfigservice.formData!=null && this.dmsconfigservice.formData[key]!=null  && this.dmsconfigservice.formData[key]!='[]' && this.dmsconfigservice.formData[key]!=undefined && this.dmsconfigservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.dmsconfigservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.dmsconfigservice.formData!=null && this.dmsconfigservice.formData[key]!=null   && this.dmsconfigservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.dmsconfigservice.formData[key]+"></div>");
}
else if(false)
{
if(this.dmsconfigservice.formData!=null && this.dmsconfigservice.formData[key]!=null   && this.dmsconfigservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.dmsconfigservice.formData[key]+"'><div class='progress__number'>"+this.dmsconfigservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.dmsconfigForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.dmsconfigForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.dmsconfigForm.value;
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

private dmsconfigtoggleOption(){
this.dmsconfigshowOption = this.dmsconfigshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.dmsconfigForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.dmsconfigForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.dmsconfigForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.dmsconfigservice.formData=this.dmsconfigForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.dmsconfigForm.controls[key] != null)
    {
        this.dmsconfigservice.formData[key] = this.dmsconfigForm.controls[key].value;
    }
}
}
}
console.log(this.dmsconfigservice.formData);
this.dmsconfigservice.formData=this.dmsconfigForm.value;
this.dmsconfigservice.saveOrUpdatedmsconfigs().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsconfig);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.dmsconfigservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsconfig);
}
else
{
this.FillData(res);
}
}
this.dmsconfigForm.markAsUntouched();
this.dmsconfigForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.dmsconfigForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcustomfieldid( formid) {
/*let ScreenType='2';
this.dialog.open(bodynamicformComponent, 
{
data: {formid:this.dmsconfigForm.get('customfieldid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditfolderid( folderid) {
/*let ScreenType='2';
this.dialog.open(dmsfolderComponent, 
{
data: {folderid:this.dmsconfigForm.get('folderid').value, ScreenType:2 }
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



