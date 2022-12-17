import { lmsresponseService } from './../../../service/lmsresponse.service';
import { lmsresponse } from './../../../model/lmsresponse.model';
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
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
//popups
//detail table services
import { lmssubresponse } from './../../../model/lmssubresponse.model';
import { lmssubresponseComponent } from './../../../pages/forms/lmssubresponse/lmssubresponse.component';
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
selector: 'app-lmsresponse',
templateUrl: './lmsresponse.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmsresponseComponent implements OnInit {
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
bfilterPopulatelmsresponses:boolean=false;
datalmsresponsesproductgroupid3:any=[];
datalmsresponsesbaseresponse3:any=[];
datalmsresponsesworkflowrole3:any=[];
datalmsresponsescolorcode3:any=[];
bfilterPopulatelmssubresponses:boolean=false;
@ViewChild('tbllmssubresponsessource',{static:false}) tbllmssubresponsessource: Ng2SmartTableComponent;
 lmsresponseForm: FormGroup;
productgroupidList: bomasterdata[];
baseresponseList: boconfigvalue[];
workflowroleList: bouserrolemaster[];
colorcodeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
lmsresponseshowOption:boolean;
lmssubresponseshowOption:boolean;
sessiondata:any;
sourcekey:any;



lmssubresponsesvisiblelist:any;
lmssubresponseshidelist:any;

DeletedlmssubresponseIDs: string="";
lmssubresponsesID: string = "1";
lmssubresponsesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private lmsresponseservice: lmsresponseService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
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
this.lmsresponseForm  = this.fb.group({
pk:[null],
responseid: [null],
productgroupid: [null],
productgroupiddesc: [null],
baseresponse: [null],
baseresponsedesc: [null],
customresponse: [null],
counter: [null],
movetotrash: [null],
workflowrole: [null],
workflowroledesc: [null],
colorcode: [null],
colorcodedesc: [null],
tathours: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmsresponseForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmsresponseForm.dirty && this.lmsresponseForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.responseid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.responseid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.responseid && pkDetail) {
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
let lmsresponseid = null;

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
this.formid=lmsresponseid;
//this.sharedService.alert(lmsresponseid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlmssubresponsesTableConfig();
  setTimeout(() => {
  this.SetlmssubresponsesTableddConfig();
  });

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
this.configservice.getList("responsecode").then(res => this.baseresponseList = res as boconfigvalue[]);
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.workflowroleList = res as bouserrolemaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("color").then(res => this.colorcodeList = res as boconfigvalue[]);

//autocomplete
    this.lmsresponseservice.getlmsresponsesList().then(res => {
      this.pkList = res as lmsresponse[];
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
this.lmsresponseForm.markAsUntouched();
this.lmsresponseForm.markAsPristine();
}



resetForm() {
if (this.lmsresponseForm != null)
this.lmsresponseForm.reset();
this.lmsresponseForm.patchValue({
});
setTimeout(() => {
this.lmsresponseservice.lmssubresponses=[];
this.lmssubresponsesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let responseid = this.lmsresponseForm.get('responseid').value;
        if(responseid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsresponseservice.deletelmsresponse(responseid).then(res =>
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
    this.lmsresponseForm.patchValue({
        responseid: null
    });
    if(this.lmsresponseservice.formData.responseid!=null)this.lmsresponseservice.formData.responseid=null;
for (let i=0;i<this.lmsresponseservice.lmssubresponses.length;i++) {
this.lmsresponseservice.lmssubresponses[i].subresponseid=null;
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
        else if(key=="tathours")
this.lmsresponseForm.patchValue({"tathours":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.lmsresponseForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmsresponseForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmsresponseForm.controls[key]!=undefined)
{
this.lmsresponseForm.controls[key].disable({onlySelf: true});
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
responseidonChange(evt:any){
let e=evt.value;
}
productgroupidonChange(evt:any){
let e=evt.value;
this.lmsresponseForm.patchValue({productgroupiddesc:evt.options[evt.options.selectedIndex].text});
}
baseresponseonChange(evt:any){
let e=this.f.baseresponse.value as any;
this.lmsresponseForm.patchValue({baseresponsedesc:evt.options[evt.options.selectedIndex].text});
}
customresponseonChange(evt:any){
let e=evt.value;
}
counteronChange(evt:any){
let e=evt.value;
}
movetotrashonChange(evt:any){
let e=evt.value;
}
workflowroleonChange(evt:any){
let e=evt.value;
this.lmsresponseForm.patchValue({workflowroledesc:evt.options[evt.options.selectedIndex].text});
}
colorcodeonChange(evt:any){
let e=this.f.colorcode.value as any;
this.lmsresponseForm.patchValue({colorcodedesc:evt.options[evt.options.selectedIndex].text});
}
tathoursonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editlmsresponses() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmsresponseservice.getlmsresponsesByEID(pkcol).then(res => {

this.lmsresponseservice.formData=res.lmsresponse;
let formproperty=res.lmsresponse.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmsresponse.pkcol;
this.formid=res.lmsresponse.responseid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmsresponse.responseid;
var tathoursTime=new Time( res.lmsresponse.tathours);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmsresponseForm.patchValue({
responseid: res.lmsresponse.responseid,
productgroupid: res.lmsresponse.productgroupid,
productgroupiddesc: res.lmsresponse.productgroupiddesc,
baseresponse: res.lmsresponse.baseresponse,
baseresponsedesc: res.lmsresponse.baseresponsedesc,
customresponse: res.lmsresponse.customresponse,
counter: res.lmsresponse.counter,
movetotrash: res.lmsresponse.movetotrash,
workflowrole: res.lmsresponse.workflowrole,
workflowroledesc: res.lmsresponse.workflowroledesc,
colorcode: res.lmsresponse.colorcode,
colorcodedesc: res.lmsresponse.colorcodedesc,
tathours: tathoursTime,
status: res.lmsresponse.status,
statusdesc: res.lmsresponse.statusdesc,
});
this.lmssubresponsesvisiblelist=res.lmssubresponsesvisiblelist;
//Child Tables if any
this.lmsresponseservice.lmssubresponses = res.lmssubresponses;
this.SetlmssubresponsesTableConfig();
this.lmssubresponsesLoadTable();
  setTimeout(() => {
  this.SetlmssubresponsesTableddConfig();
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
  for (let key in this.lmsresponseForm.controls) {
    if (this.lmsresponseForm.controls[key] != null) {
if(false)
{
if(this.lmsresponseservice.formData!=null && this.lmsresponseservice.formData[key]!=null  && this.lmsresponseservice.formData[key]!='[]' && this.lmsresponseservice.formData[key]!=undefined && this.lmsresponseservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmsresponseservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmsresponseservice.formData!=null && this.lmsresponseservice.formData[key]!=null   && this.lmsresponseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmsresponseservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmsresponseservice.formData!=null && this.lmsresponseservice.formData[key]!=null   && this.lmsresponseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmsresponseservice.formData[key]+"'><div class='progress__number'>"+this.lmsresponseservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmsresponseForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmsresponseForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.lmsresponseForm.value;
obj.tathours=(this.lmsresponseForm.get('tathours').value==null?0:this.lmsresponseForm.get('tathours').value.hour)+':'+(this.lmsresponseForm.get('tathours').value==null?0:this.lmsresponseForm.get('tathours').value.minute+":00");
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

private lmsresponsetoggleOption(){
this.lmsresponseshowOption = this.lmsresponseshowOption === true ? false : true;
}

private lmssubresponsetoggleOption(){
this.lmssubresponseshowOption = this.lmssubresponseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmsresponseForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmsresponseForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmsresponseForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmsresponseservice.formData=this.lmsresponseForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmsresponseForm.controls[key] != null)
    {
        this.lmsresponseservice.formData[key] = this.lmsresponseForm.controls[key].value;
    }
}
}
}
this.lmsresponseservice.formData.tathours=(this.lmsresponseForm.get('tathours').value==null?0:this.lmsresponseForm.get('tathours').value.hour)+':'+(this.lmsresponseForm.get('tathours').value==null?0:this.lmsresponseForm.get('tathours').value.minute+":00");
this.lmsresponseservice.formData.DeletedlmssubresponseIDs = this.DeletedlmssubresponseIDs;
console.log(this.lmsresponseservice.formData);
this.lmsresponseservice.formData=this.lmsresponseForm.value;
this.lmsresponseservice.saveOrUpdatelmsresponses().subscribe(
async res => {
if (this.lmssubresponsessource.data)
{
    for (let i = 0; i < this.lmssubresponsessource.data.length; i++)
    {
        if (this.lmssubresponsessource.data[i].fileattachmentlist)await this.sharedService.upload(this.lmssubresponsessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsresponse);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmsresponseservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsresponse);
}
else
{
this.FillData(res);
}
}
this.lmsresponseForm.markAsUntouched();
this.lmsresponseForm.markAsPristine();
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
data: {masterdataid:this.lmsresponseForm.get('productgroupid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditworkflowrole( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.lmsresponseForm.get('workflowrole').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlmssubresponse(event:any,subresponseid:any, responseid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(lmssubresponseComponent, 
{
data:  {  showview:false,save:false,event,subresponseid, responseid,visiblelist:this.lmssubresponsesvisiblelist,  hidelist:this.lmssubresponseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.lmssubresponsessource.add(res);
this.lmssubresponsessource.refresh();
}
else
{
this.lmssubresponsessource.update(event.data, res);
}
}
});
}

onDeletelmssubresponse(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlmssubresponseIDs += childID + ",";
this.lmsresponseservice.lmssubresponses.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes lmssubresponses
lmssubresponsessettings:any;
lmssubresponsessource: any;

showlmssubresponsesCheckbox()
{
debugger;
if(this.tbllmssubresponsessource.settings['selectMode']== 'multi')this.tbllmssubresponsessource.settings['selectMode']= 'single';
else
this.tbllmssubresponsessource.settings['selectMode']= 'multi';
this.tbllmssubresponsessource.initGrid();
}
deletelmssubresponsesAll()
{
this.tbllmssubresponsessource.settings['selectMode'] = 'single';
}
showlmssubresponsesFilter()
{
  setTimeout(() => {
  this.SetlmssubresponsesTableddConfig();
  });
      if(this.tbllmssubresponsessource.settings!=null)this.tbllmssubresponsessource.settings['hideSubHeader'] =!this.tbllmssubresponsessource.settings['hideSubHeader'];
this.tbllmssubresponsessource.initGrid();
}
showlmssubresponsesInActive()
{
}
enablelmssubresponsesInActive()
{
}
async SetlmssubresponsesTableddConfig()
{
if(!this.bfilterPopulatelmssubresponses){
}
this.bfilterPopulatelmssubresponses=true;
}
async lmssubresponsesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlmssubresponsesTableConfig()
{
this.lmssubresponsessettings = {
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
productgroupid: {
title: 'Product Group',
type: 'number',
filter:true,
},
baseresponse: {
title: 'Base Response',
type: '',
filter:true,
},
subresponse: {
title: 'Sub Response',
type: '',
filter:true,
},
},
};
}
lmssubresponsesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmssubresponsesID)>=0)
{
this.lmssubresponsessource=new LocalDataSource();
this.lmssubresponsessource.load(this.lmsresponseservice.lmssubresponses as  any as LocalDataSource);
this.lmssubresponsessource.setPaging(1, 20, true);
}
}

//external to inline
/*
lmssubresponsesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.lmsresponseservice.lmssubresponses.length == 0)
{
    this.tbllmssubresponsessource.grid.createFormShown = true;
}
else
{
    let obj = new lmssubresponse();
    this.lmsresponseservice.lmssubresponses.push(obj);
    this.lmssubresponsessource.refresh();
    if ((this.lmsresponseservice.lmssubresponses.length / this.lmssubresponsessource.getPaging().perPage).toFixed(0) + 1 != this.lmssubresponsessource.getPaging().page)
    {
        this.lmssubresponsessource.setPage((this.lmsresponseservice.lmssubresponses.length / this.lmssubresponsessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllmssubresponsessource.grid.edit(this.tbllmssubresponsessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.lmssubresponsessource.data.indexOf(event.data);
this.onDeletelmssubresponse(event,event.data.subresponseid,((this.lmssubresponsessource.getPaging().page-1) *this.lmssubresponsessource.getPaging().perPage)+index);
this.lmssubresponsessource.refresh();
break;
}
}

*/
lmssubresponsesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlmssubresponse(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlmssubresponse(event,event.data.subresponseid,this.formid);
break;
case 'delete':
this.onDeletelmssubresponse(event,event.data.subresponseid,((this.lmssubresponsessource.getPaging().page-1) *this.lmssubresponsessource.getPaging().perPage)+event.index);
this.lmssubresponsessource.refresh();
break;
}
}
lmssubresponsesonDelete(obj) {
let subresponseid=obj.data.subresponseid;
if (confirm('Are you sure to delete this record ?')) {
this.lmsresponseservice.deletelmsresponse(subresponseid).then(res=>
this.lmssubresponsesLoadTable()
);
}
}
lmssubresponsesPaging(val)
{
debugger;
this.lmssubresponsessource.setPaging(1, val, true);
}

handlelmssubresponsesGridSelected(event:any) {
this.lmssubresponsesselectedindex=this.lmsresponseservice.lmssubresponses.findIndex(i => i.subresponseid === event.data.subresponseid);
}
IslmssubresponsesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.lmssubresponsesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes lmssubresponses

}



