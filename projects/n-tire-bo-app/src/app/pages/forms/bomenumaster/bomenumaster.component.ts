import { bomenumasterService } from './../../../service/bomenumaster.service';
import { bomenumaster } from './../../../model/bomenumaster.model';
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
//detail table services
import { bomenuaction } from './../../../model/bomenuaction.model';
import { bomenuactionComponent } from './../../../pages/forms/bomenuaction/bomenuaction.component';
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
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-bomenumaster',
templateUrl: './bomenumaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bomenumasterComponent implements OnInit {
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
bfilterPopulatebomenumasters:boolean=false;
databomenumastersparentid3:any=[];
databomenuactionsactiontype3:any=[];
databomenuactionsrowselecttype3:any=[];
bfilterPopulatebomenuactions:boolean=false;
@ViewChild('tblbomenuactionssource',{static:false}) tblbomenuactionssource: Ng2SmartTableComponent;
 bomenumasterForm: FormGroup;
parentidList: bomenumaster[];
parentidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
parentid_bomenumastersForm: FormGroup;//autocomplete
parentid_bomenumastersoptions:any;//autocomplete
parentid_bomenumastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bomenuactionsvisiblelist:any;
bomenuactionshidelist:any;

DeletedbomenuactionIDs: string="";
bomenuactionsID: string = "1";
bomenuactionsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bomenumasterservice: bomenumasterService,
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
this.bomenumasterForm  = this.fb.group({
pk:[null],
menuid: [null],
menucode: [null],
menudescription: [null, Validators.required],
menuurl: [null],
iconname: [null],
helpurl: [null],
helptext: [null],
parentid: [null],
parentiddesc: [null],
orderno: [null],
action: [null],
showcheckbox: [null],
showstatus: [null],
checkboxcolumn: [null],
nonew: [null],
noedit: [null],
nodelete: [null],
wherecondition: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bomenumasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bomenumasterForm.dirty && this.bomenumasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
menudescriptionexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.menudescription.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].menuid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Menu Description value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}

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
  let pos = this.pkList.map(function(e:any) { return e.menuid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.menuid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.menuid && pkDetail) {
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
let bomenumasterid = null;

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
this.formid=bomenumasterid;
//this.sharedService.alert(bomenumasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbomenuactionsTableConfig();
  setTimeout(() => {
  this.SetbomenuactionsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bomenumasterservice.getbomenumastersList().then(res => 
{
this.parentidList = res as bomenumaster[];
if(this.bomenumasterservice.formData && this.bomenumasterservice.formData.parentid){
this.parentidoptionsEvent.emit(this.parentidList);
this.bomenumasterForm.patchValue({
    parentid: this.bomenumasterservice.formData.parentid,
    parentiddesc: this.bomenumasterservice.formData.parentiddesc,
});
}
{
let arrparentid = this.parentidList.filter(v => v.menuid == this.bomenumasterForm.get('parentid').value);
let objparentid;
if (arrparentid.length > 0) objparentid = arrparentid[0];
if (objparentid)
{
}
}
}
).catch((err) => {console.log(err);});
this.parentid_bomenumastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.parentidList.filter(v => v.menudescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.parentid_bomenumastersformatter = (result: any) => result.menudescription;

//autocomplete
    this.bomenumasterservice.getbomenumastersList().then(res => {
      this.pkList = res as bomenumaster[];
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
this.bomenumasterForm.markAsUntouched();
this.bomenumasterForm.markAsPristine();
}
onSelectedparentid(parentidDetail: any) {
if (parentidDetail.parentid && parentidDetail) {
this.bomenumasterForm.patchValue({
parentid: parentidDetail.parentid,
parentiddesc: parentidDetail.menudescription,

});

}
}




resetForm() {
if (this.bomenumasterForm != null)
this.bomenumasterForm.reset();
this.bomenumasterForm.patchValue({
});
setTimeout(() => {
this.bomenumasterservice.bomenuactions=[];
this.bomenuactionsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let menuid = this.bomenumasterForm.get('menuid').value;
        if(menuid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bomenumasterservice.deletebomenumaster(menuid).then(res =>
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
    this.bomenumasterForm.patchValue({
        menuid: null
    });
    if(this.bomenumasterservice.formData.menuid!=null)this.bomenumasterservice.formData.menuid=null;
for (let i=0;i<this.bomenumasterservice.bomenuactions.length;i++) {
this.bomenumasterservice.bomenuactions[i].actionid=null;
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
        else if(ctrltype=="string")
{
this.bomenumasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bomenumasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bomenumasterForm.controls[key]!=undefined)this.bomenumasterForm.controls[key].disable({onlySelf: true});
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
menuidonChange(evt:any){
let e=evt.value;
}
menucodeonChange(evt:any){
let e=evt.value;
}
menudescriptiononChange(evt:any){
let e=evt.value;
}
menuurlonChange(evt:any){
let e=evt.value;
}
iconnameonChange(evt:any){
let e=evt.value;
}
helpurlonChange(evt:any){
let e=evt.value;
}
helptextonChange(evt:any){
let e=evt.value;
}
parentidonChange(evt:any){
let e=evt.value;
}
ordernoonChange(evt:any){
let e=evt.value;
}
actiononChange(evt:any){
let e=evt.value;
}
showcheckboxonChange(evt:any){
let e=evt.value;
}
showstatusonChange(evt:any){
let e=evt.value;
}
checkboxcolumnonChange(evt:any){
let e=evt.value;
}
nonewonChange(evt:any){
let e=evt.value;
}
noeditonChange(evt:any){
let e=evt.value;
}
nodeleteonChange(evt:any){
let e=evt.value;
}
whereconditiononChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.bomenumasterservice.getbomenumastersByEID(pkcol).then(res => {

this.bomenumasterservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bomenumaster.menuid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bomenumaster.menuid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bomenumasterForm.patchValue({
menuid: res.bomenumaster.menuid,
menucode: res.bomenumaster.menucode,
menudescription: res.bomenumaster.menudescription,
menuurl: res.bomenumaster.menuurl,
iconname: res.bomenumaster.iconname,
helpurl: res.bomenumaster.helpurl,
helptext: res.bomenumaster.helptext,
parentid: res.bomenumaster.parentid,
parentiddesc: res.bomenumaster.parentiddesc,
orderno: res.bomenumaster.orderno,
action: res.bomenumaster.action,
showcheckbox: res.bomenumaster.showcheckbox,
showstatus: res.bomenumaster.showstatus,
checkboxcolumn: res.bomenumaster.checkboxcolumn,
nonew: res.bomenumaster.nonew,
noedit: res.bomenumaster.noedit,
nodelete: res.bomenumaster.nodelete,
wherecondition: res.bomenumaster.wherecondition,
status: res.bomenumaster.status,
statusdesc: res.bomenumaster.statusdesc,
});
this.bomenuactionsvisiblelist=res.bomenuactionsvisiblelist;
//Child Tables if any
this.bomenumasterservice.bomenuactions = res.bomenuactions;
this.SetbomenuactionsTableConfig();
this.bomenuactionsLoadTable();
  setTimeout(() => {
  this.SetbomenuactionsTableddConfig();
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
  for (let key in this.bomenumasterForm.controls) {
    if (this.bomenumasterForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bomenumasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bomenumasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bomenumasterForm.value;
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bomenumasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bomenumasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bomenumasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bomenumasterservice.formData=this.bomenumasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bomenumasterForm.controls[key] != null)
    {
        this.bomenumasterservice.formData[key] = this.bomenumasterForm.controls[key].value;
    }
}
}
}
this.bomenumasterservice.formData.DeletedbomenuactionIDs = this.DeletedbomenuactionIDs;
console.log(this.bomenumasterservice.formData);
this.bomenumasterservice.formData=this.bomenumasterForm.value;
this.bomenumasterservice.saveOrUpdatebomenumasters().subscribe(
async res => {
if (this.bomenuactionssource.data)
{
    for (let i = 0; i < this.bomenuactionssource.data.length; i++)
    {
        if (this.bomenuactionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bomenuactionssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bomenumaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bomenumasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bomenumaster);
}
else
{
this.FillData(res);
}
}
this.bomenumasterForm.markAsUntouched();
this.bomenumasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditparentid( menuid) {
/*let ScreenType='2';
this.dialog.open(bomenumasterComponent, 
{
data: {menuid:this.bomenumasterForm.get('parentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbomenuaction(event:any,actionid:any, menuid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bomenuactionComponent, 
{
data:  {  showview:this.showview,save:false,event,actionid, menuid,visiblelist:this.bomenuactionsvisiblelist,  hidelist:this.bomenuactionshidelist,ScreenType:2  },
header: 'Menu Actions'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bomenuactionssource.add(res);
this.bomenuactionssource.refresh();
}
else
{
this.bomenuactionssource.update(event.data, res);
}
}
});
}

onDeletebomenuaction(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbomenuactionIDs += childID + ",";
this.bomenumasterservice.bomenuactions.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bomenuactions
bomenuactionssettings:any;
bomenuactionssource: any;

showbomenuactionsCheckbox()
{
debugger;
if(this.tblbomenuactionssource.settings['selectMode']== 'multi')this.tblbomenuactionssource.settings['selectMode']= 'single';
else
this.tblbomenuactionssource.settings['selectMode']= 'multi';
this.tblbomenuactionssource.initGrid();
}
deletebomenuactionsAll()
{
this.tblbomenuactionssource.settings['selectMode'] = 'single';
}
showbomenuactionsFilter()
{
  setTimeout(() => {
  this.SetbomenuactionsTableddConfig();
  });
      if(this.tblbomenuactionssource.settings!=null)this.tblbomenuactionssource.settings['hideSubHeader'] =!this.tblbomenuactionssource.settings['hideSubHeader'];
this.tblbomenuactionssource.initGrid();
}
showbomenuactionsInActive()
{
}
enablebomenuactionsInActive()
{
}
async SetbomenuactionsTableddConfig()
{
if(!this.bfilterPopulatebomenuactions){

this.configservice.getList("rowselecttype").then(res=>
{
var datarowselecttype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databomenuactionsrowselecttype3.push(defaultobj);
for(let i=0; i<datarowselecttype2.length; i++){
var obj= { value: datarowselecttype2[i].configkey, title: datarowselecttype2[i].configtext};
this.databomenuactionsrowselecttype3.push(obj);
}
var clone = this.sharedService.clone(this.tblbomenuactionssource.settings);
if(clone.columns['rowselecttype']!=undefined)clone.columns['rowselecttype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databomenuactionsrowselecttype3)), }, };
if(clone.columns['rowselecttype']!=undefined)clone.columns['rowselecttype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databomenuactionsrowselecttype3)), }, };
this.tblbomenuactionssource.settings =  clone;
this.tblbomenuactionssource.initGrid();
});

this.configservice.getList("actiontype").then(res=>
{
var dataactiontype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databomenuactionsactiontype3.push(defaultobj);
for(let i=0; i<dataactiontype2.length; i++){
var obj= { value: dataactiontype2[i].configkey, title: dataactiontype2[i].configtext};
this.databomenuactionsactiontype3.push(obj);
}
var clone = this.sharedService.clone(this.tblbomenuactionssource.settings);
if(clone.columns['actiontype']!=undefined)clone.columns['actiontype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databomenuactionsactiontype3)), }, };
if(clone.columns['actiontype']!=undefined)clone.columns['actiontype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databomenuactionsactiontype3)), }, };
this.tblbomenuactionssource.settings =  clone;
this.tblbomenuactionssource.initGrid();
});
}
this.bfilterPopulatebomenuactions=true;
}
async bomenuactionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbomenuactionsTableConfig()
{
this.bomenuactionssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
description: {
title: 'Description',
type: '',
filter:true,
},
rowselecttype: {
title: 'Row Select Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databomenuactionsrowselecttype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
actionicon: {
title: 'Action Icon',
type: '',
filter:true,
},
actiontype: {
title: 'Action Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databomenuactionsactiontype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
servicename: {
title: 'Service Name',
type: '',
filter:true,
},
actionname: {
title: 'Action Name',
type: '',
filter:true,
},
actioncondition: {
title: 'Action Condition',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
actionhelp: {
title: 'Action Help',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
actionrequestorfield: {
title: 'Action Requestor Field',
type: '',
filter:true,
},
actionassigneduserfield: {
title: 'Action Assigned User Field',
type: '',
filter:true,
},
notificationtext: {
title: 'Notification Text',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
actionrequestoremailfield: {
title: 'Action Requestor Email Field',
type: '',
filter:true,
},
actionassigneduseremailfield: {
title: 'Action Assigned User Email Field',
type: '',
filter:true,
},
},
};
}
bomenuactionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bomenuactionsID)>=0)
{
this.bomenuactionssource=new LocalDataSource();
this.bomenuactionssource.load(this.bomenumasterservice.bomenuactions as  any as LocalDataSource);
this.bomenuactionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bomenuactionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bomenumasterservice.bomenuactions.length == 0)
{
    this.tblbomenuactionssource.grid.createFormShown = true;
}
else
{
    let obj = new bomenuaction();
    this.bomenumasterservice.bomenuactions.push(obj);
    this.bomenuactionssource.refresh();
    if ((this.bomenumasterservice.bomenuactions.length / this.bomenuactionssource.getPaging().perPage).toFixed(0) + 1 != this.bomenuactionssource.getPaging().page)
    {
        this.bomenuactionssource.setPage((this.bomenumasterservice.bomenuactions.length / this.bomenuactionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbomenuactionssource.grid.edit(this.tblbomenuactionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bomenuactionssource.data.indexOf(event.data);
this.onDeletebomenuaction(event,event.data.actionid,((this.bomenuactionssource.getPaging().page-1) *this.bomenuactionssource.getPaging().perPage)+index);
this.bomenuactionssource.refresh();
break;
}
}

*/
bomenuactionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbomenuaction(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbomenuaction(event,event.data.actionid,this.formid);
break;
case 'delete':
this.onDeletebomenuaction(event,event.data.actionid,((this.bomenuactionssource.getPaging().page-1) *this.bomenuactionssource.getPaging().perPage)+event.index);
this.bomenuactionssource.refresh();
break;
}
}
bomenuactionsonDelete(obj) {
let actionid=obj.data.actionid;
if (confirm('Are you sure to delete this record ?')) {
this.bomenumasterservice.deletebomenumaster(actionid).then(res=>
this.bomenuactionsLoadTable()
);
}
}
bomenuactionsPaging(val)
{
debugger;
this.bomenuactionssource.setPaging(1, val, true);
}

handlebomenuactionsGridSelected(event:any) {
this.bomenuactionsselectedindex=this.bomenumasterservice.bomenuactions.findIndex(i => i.actionid === event.data.actionid);
}
IsbomenuactionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bomenuactionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bomenuactions

}



