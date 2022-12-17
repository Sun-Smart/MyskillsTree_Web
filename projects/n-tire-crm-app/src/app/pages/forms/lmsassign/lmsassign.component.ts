import { lmsassignService } from './../../../service/lmsassign.service';
import { lmsassign } from './../../../model/lmsassign.model';
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
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { lmsproductmaster} from './../../../model/lmsproductmaster.model';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-lmsassign',
templateUrl: './lmsassign.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmsassignComponent implements OnInit {
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
bfilterPopulatelmsassigns:boolean=false;
datalmsassignsproductgroupid3:any=[];
datalmsassignsproductid3:any=[];
datalmsassignssource3:any=[];
datalmsassignsassigntype3:any=[];
datalmsassignsassignuser3:any=[];
datalmsassignsassignrole3:any=[];
 lmsassignForm: FormGroup;
productgroupidList: bomasterdata[];
productidList: lmsproductmaster[];
sourceList: boconfigvalue[];
assigntypeList: boconfigvalue[];
assignuserList: bousermaster[];
assignuseroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assignuser_bousermastersForm: FormGroup;//autocomplete
assignuser_bousermastersoptions:any;//autocomplete
assignuser_bousermastersformatter:any;//autocomplete
assignroleList: bouserrolemaster[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
lmsassignshowOption:boolean;
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
private lmsassignservice: lmsassignService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private lmsproductmasterservice:lmsproductmasterService,
private bousermasterservice:bousermasterService,
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
this.lmsassignForm  = this.fb.group({
pk:[null],
productgroupid: [null],
productgroupiddesc: [null],
productid: [null],
productiddesc: [null],
source: [null],
sourcedesc: [null],
assigntype: [null],
assigntypedesc: [null],
assignuser: [null],
assignuserdesc: [null],
assignrole: [null],
assignroledesc: [null],
assignid: [null],
skillratefrom: [null],
skillrateto: [null],
certified: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmsassignForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmsassignForm.dirty && this.lmsassignForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.assignid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.assignid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.assignid && pkDetail) {
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
let lmsassignid = null;

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
this.formid=lmsassignid;
//this.sharedService.alert(lmsassignid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bomasterdataservice.getList("kft5a").then(res => {
this.productgroupidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.lmsproductmasterservice.getlmsproductmastersList().then(res => 
{
this.productidList = res as lmsproductmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("leadsource").then(res => this.sourceList = res as boconfigvalue[]);
this.configservice.getList("leadassigntype").then(res => this.assigntypeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.assignuserList = res as bousermaster[];
if(this.lmsassignservice.formData && this.lmsassignservice.formData.assignuser){
this.assignuseroptionsEvent.emit(this.assignuserList);
this.lmsassignForm.patchValue({
    assignuser: this.lmsassignservice.formData.assignuser,
    assignuserdesc: this.lmsassignservice.formData.assignuserdesc,
});
}
{
let arrassignuser = this.assignuserList.filter(v => v.userid == this.lmsassignForm.get('assignuser').value);
let objassignuser;
if (arrassignuser.length > 0) objassignuser = arrassignuser[0];
if (objassignuser)
{
}
}
}
).catch((err) => {console.log(err);});
this.assignuser_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assignuserList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assignuser_bousermastersformatter = (result: any) => result.username;
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.assignroleList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.lmsassignservice.getlmsassignsList().then(res => {
      this.pkList = res as lmsassign[];
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
this.lmsassignForm.markAsUntouched();
this.lmsassignForm.markAsPristine();
}
onSelectedassignuser(assignuserDetail: any) {
if (assignuserDetail.userid && assignuserDetail) {
this.lmsassignForm.patchValue({
assignuser: assignuserDetail.userid,
assignuserdesc: assignuserDetail.username,

});

}
}




resetForm() {
if (this.lmsassignForm != null)
this.lmsassignForm.reset();
this.lmsassignForm.patchValue({
assignuser: this.sessiondata.userid,
assignuserdesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let assignid = this.lmsassignForm.get('assignid').value;
        if(assignid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsassignservice.deletelmsassign(assignid).then(res =>
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
    this.lmsassignForm.patchValue({
        assignid: null
    });
    if(this.lmsassignservice.formData.assignid!=null)this.lmsassignservice.formData.assignid=null;
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
this.lmsassignForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmsassignForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmsassignForm.controls[key]!=undefined)
{
this.lmsassignForm.controls[key].disable({onlySelf: true});
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
productgroupidonChange(evt:any){
let e=evt.value;
this.lmsassignForm.patchValue({productgroupiddesc:evt.options[evt.options.selectedIndex].text});
}
productidonChange(evt:any){
let e=evt.value;
this.lmsassignForm.patchValue({productiddesc:evt.options[evt.options.selectedIndex].text});
}
sourceonChange(evt:any){
let e=this.f.source.value as any;
this.lmsassignForm.patchValue({sourcedesc:evt.options[evt.options.selectedIndex].text});
}
assigntypeonChange(evt:any){
let e=this.f.assigntype.value as any;
this.lmsassignForm.patchValue({assigntypedesc:evt.options[evt.options.selectedIndex].text});
}
assignuseronChange(evt:any){
let e=evt.value;
}
assignroleonChange(evt:any){
let e=evt.value;
this.lmsassignForm.patchValue({assignroledesc:evt.options[evt.options.selectedIndex].text});
}
assignidonChange(evt:any){
let e=evt.value;
}
skillratefromonChange(evt:any){
let e=evt.value;
}
skillratetoonChange(evt:any){
let e=evt.value;
}
certifiedonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editlmsassigns() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmsassignservice.getlmsassignsByEID(pkcol).then(res => {

this.lmsassignservice.formData=res.lmsassign;
let formproperty=res.lmsassign.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmsassign.pkcol;
this.formid=res.lmsassign.assignid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmsassign.assignid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmsassignForm.patchValue({
productgroupid: res.lmsassign.productgroupid,
productgroupiddesc: res.lmsassign.productgroupiddesc,
productid: res.lmsassign.productid,
productiddesc: res.lmsassign.productiddesc,
source: res.lmsassign.source,
sourcedesc: res.lmsassign.sourcedesc,
assigntype: res.lmsassign.assigntype,
assigntypedesc: res.lmsassign.assigntypedesc,
assignuser: res.lmsassign.assignuser,
assignuserdesc: res.lmsassign.assignuserdesc,
assignrole: res.lmsassign.assignrole,
assignroledesc: res.lmsassign.assignroledesc,
assignid: res.lmsassign.assignid,
skillratefrom: res.lmsassign.skillratefrom,
skillrateto: res.lmsassign.skillrateto,
certified: res.lmsassign.certified,
status: res.lmsassign.status,
statusdesc: res.lmsassign.statusdesc,
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
  for (let key in this.lmsassignForm.controls) {
    if (this.lmsassignForm.controls[key] != null) {
if(false)
{
if(this.lmsassignservice.formData!=null && this.lmsassignservice.formData[key]!=null  && this.lmsassignservice.formData[key]!='[]' && this.lmsassignservice.formData[key]!=undefined && this.lmsassignservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmsassignservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmsassignservice.formData!=null && this.lmsassignservice.formData[key]!=null   && this.lmsassignservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmsassignservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmsassignservice.formData!=null && this.lmsassignservice.formData[key]!=null   && this.lmsassignservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmsassignservice.formData[key]+"'><div class='progress__number'>"+this.lmsassignservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmsassignForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmsassignForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.lmsassignForm.value;
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
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

private lmsassigntoggleOption(){
this.lmsassignshowOption = this.lmsassignshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmsassignForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmsassignForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmsassignForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmsassignservice.formData=this.lmsassignForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmsassignForm.controls[key] != null)
    {
        this.lmsassignservice.formData[key] = this.lmsassignForm.controls[key].value;
    }
}
}
}
console.log(this.lmsassignservice.formData);
this.lmsassignservice.formData=this.lmsassignForm.value;
this.lmsassignservice.saveOrUpdatelmsassigns().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsassign);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmsassignservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsassign);
}
else
{
this.FillData(res);
}
}
this.lmsassignForm.markAsUntouched();
this.lmsassignForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditproductgroupid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.lmsassignForm.get('productgroupid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditproductid( productid) {
/*let ScreenType='2';
this.dialog.open(lmsproductmasterComponent, 
{
data: {productid:this.lmsassignForm.get('productid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassignuser( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.lmsassignForm.get('assignuser').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditassignrole( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.lmsassignForm.get('assignrole').value, ScreenType:2 }
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



