import { bodashboardService } from './../../../service/bodashboard.service';
import { bodashboard } from './../../../model/bodashboard.model';
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
import { bodashboarddetail } from './../../../model/bodashboarddetail.model';
//FK services
import { bodashboarddetailComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bodashboarddetail/bodashboarddetail.component';
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
selector: 'app-bodashboard',
templateUrl: './bodashboard.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bodashboardComponent implements OnInit {
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
bfilterPopulatebodashboards:boolean=false;
databodashboardsdashboardid3:any=[];
databodashboarddetailsreportid3:any=[];
bfilterPopulatebodashboarddetails:boolean=false;
@ViewChild('tblbodashboarddetailssource',{static:false}) tblbodashboarddetailssource: Ng2SmartTableComponent;
 bodashboardForm: FormGroup;
dashboardidList: bodashboard[];
dashboardidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
dashboardid_bodashboardsForm: FormGroup;//autocomplete
dashboardid_bodashboardsoptions:any;//autocomplete
dashboardid_bodashboardsformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bodashboarddetailsvisiblelist:any;
bodashboarddetailshidelist:any;

DeletedbodashboarddetailIDs: string="";
bodashboarddetailsID: string = "1";
bodashboarddetailsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bodashboardservice: bodashboardService,
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
this.bodashboardForm  = this.fb.group({pk:[null],dashboardid: [null],
dashboardiddesc: [null],
dashboardname: [null],
rows: [null],
cols: [null],
design: [null],
remarks: [null],
userid: [null],
module: [null],
helptext: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bodashboardForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bodashboardForm.dirty && this.bodashboardForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.dashboardid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.dashboardid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.dashboardid && pkDetail) {
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
let bodashboardid = null;

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
this.formid=bodashboardid;
//this.sharedService.alert(bodashboardid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbodashboarddetailsTableConfig();
  setTimeout(() => {
  this.SetbodashboarddetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bodashboardservice.getbodashboardsList().then(res => 
{
this.dashboardidList = res as bodashboard[];
if(this.bodashboardservice.formData && this.bodashboardservice.formData.dashboardid){
this.dashboardidoptionsEvent.emit(this.dashboardidList);
this.bodashboardForm.patchValue({
    dashboardid: this.bodashboardservice.formData.dashboardid,
    dashboardiddesc: this.bodashboardservice.formData.dashboardiddesc,
});
}
{
let arrdashboardid = this.dashboardidList.filter(v => v.dashboardid == this.bodashboardForm.get('dashboardid').value);
let objdashboardid;
if (arrdashboardid.length > 0) objdashboardid = arrdashboardid[0];
if (objdashboardid)
{
}
}
}
).catch((err) => {console.log(err);});
this.dashboardid_bodashboardsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.dashboardidList.filter(v => v.dashboardname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.dashboardid_bodashboardsformatter = (result: any) => result.dashboardname;

//autocomplete
    this.bodashboardservice.getbodashboardsList().then(res => {
      this.pkList = res as bodashboard[];
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
this.bodashboardForm.markAsUntouched();
this.bodashboardForm.markAsPristine();
}
onSelecteddashboardid(dashboardidDetail: any) {
if (dashboardidDetail.dashboardid && dashboardidDetail) {
this.bodashboardForm.patchValue({
dashboardid: dashboardidDetail.dashboardid,
dashboardiddesc: dashboardidDetail.dashboardname,

});

}
}




resetForm() {
if (this.bodashboardForm != null)
this.bodashboardForm.reset();
this.bodashboardForm.patchValue({
});
setTimeout(() => {
this.bodashboardservice.bodashboarddetails=[];
this.bodashboarddetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let dashboardid = this.bodashboardForm.get('dashboardid').value;
        if(dashboardid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bodashboardservice.deletebodashboard(dashboardid).then(res =>
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
    this.bodashboardForm.patchValue({
        dashboardid: null
    });
    if(this.bodashboardservice.formData.dashboardid!=null)this.bodashboardservice.formData.dashboardid=null;
for (let i=0;i<this.bodashboardservice.bodashboarddetails.length;i++) {
this.bodashboardservice.bodashboarddetails[i].dashboarddetailid=null;
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
this.bodashboardForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bodashboardForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bodashboardForm.controls[key]!=undefined)this.bodashboardForm.controls[key].disable({onlySelf: true});
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
dashboardidonChange(evt:any){
let e=evt.value;
}
dashboardnameonChange(evt:any){
let e=evt.value;
}
rowsonChange(evt:any){
let e=evt.value;
}
colsonChange(evt:any){
let e=evt.value;
}
designonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
useridonChange(evt:any){
let e=evt.value;
}
moduleonChange(evt:any){
let e=evt.value;
}
helptextonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.bodashboardservice.getbodashboardsByEID(pkcol).then(res => {

this.bodashboardservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bodashboard.dashboardid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bodashboard.dashboardid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bodashboardForm.patchValue({
dashboardid: res.bodashboard.dashboardid,
dashboardiddesc: res.bodashboard.dashboardiddesc,
dashboardname: res.bodashboard.dashboardname,
rows: res.bodashboard.rows,
cols: res.bodashboard.cols,
design: res.bodashboard.design,
remarks: res.bodashboard.remarks,
userid: res.bodashboard.userid,
module: res.bodashboard.module,
helptext: res.bodashboard.helptext,
status: res.bodashboard.status,
statusdesc: res.bodashboard.statusdesc,
});
this.bodashboarddetailsvisiblelist=res.bodashboarddetailsvisiblelist;
//Child Tables if any
this.bodashboardservice.bodashboarddetails = res.bodashboarddetails;
this.SetbodashboarddetailsTableConfig();
this.bodashboarddetailsLoadTable();
  setTimeout(() => {
  this.SetbodashboarddetailsTableddConfig();
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
  for (let key in this.bodashboardForm.controls) {
    if (this.bodashboardForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bodashboardForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bodashboardForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bodashboardForm.value;
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
Object.keys(this.bodashboardForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bodashboardForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bodashboardForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bodashboardservice.formData=this.bodashboardForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bodashboardForm.controls[key] != null)
    {
        this.bodashboardservice.formData[key] = this.bodashboardForm.controls[key].value;
    }
}
}
}
this.bodashboardservice.formData.DeletedbodashboarddetailIDs = this.DeletedbodashboarddetailIDs;
console.log(this.bodashboardservice.formData);
this.bodashboardservice.formData=this.bodashboardForm.value;
this.bodashboardservice.saveOrUpdatebodashboards().subscribe(
async res => {
if (this.bodashboarddetailssource.data)
{
    for (let i = 0; i < this.bodashboarddetailssource.data.length; i++)
    {
        if (this.bodashboarddetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bodashboarddetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bodashboard);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bodashboardservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bodashboard);
}
else
{
this.FillData(res);
}
}
this.bodashboardForm.markAsUntouched();
this.bodashboardForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditdashboardid( dashboardid) {
/*let ScreenType='2';
this.dialog.open(bodashboardComponent, 
{
data: {dashboardid:this.bodashboardForm.get('dashboardid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbodashboarddetail(event:any,dashboarddetailid:any, dashboardid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bodashboarddetailComponent, 
{
data:  {  showview:this.showview,save:false,event,dashboarddetailid, dashboardid,visiblelist:this.bodashboarddetailsvisiblelist,  hidelist:this.bodashboarddetailshidelist,ScreenType:2  },
header: 'Dashboard Details'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bodashboarddetailssource.add(res);
this.bodashboarddetailssource.refresh();
}
else
{
this.bodashboarddetailssource.update(event.data, res);
}
}
});
}

onDeletebodashboarddetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbodashboarddetailIDs += childID + ",";
this.bodashboardservice.bodashboarddetails.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bodashboarddetails
bodashboarddetailssettings:any;
bodashboarddetailssource: any;

showbodashboarddetailsCheckbox()
{
debugger;
if(this.tblbodashboarddetailssource.settings['selectMode']== 'multi')this.tblbodashboarddetailssource.settings['selectMode']= 'single';
else
this.tblbodashboarddetailssource.settings['selectMode']= 'multi';
this.tblbodashboarddetailssource.initGrid();
}
deletebodashboarddetailsAll()
{
this.tblbodashboarddetailssource.settings['selectMode'] = 'single';
}
showbodashboarddetailsFilter()
{
  setTimeout(() => {
  this.SetbodashboarddetailsTableddConfig();
  });
      if(this.tblbodashboarddetailssource.settings!=null)this.tblbodashboarddetailssource.settings['hideSubHeader'] =!this.tblbodashboarddetailssource.settings['hideSubHeader'];
this.tblbodashboarddetailssource.initGrid();
}
showbodashboarddetailsInActive()
{
}
enablebodashboarddetailsInActive()
{
}
async SetbodashboarddetailsTableddConfig()
{
if(!this.bfilterPopulatebodashboarddetails){

this.configservice.getList("reportid").then(res=>
{
var datareportid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databodashboarddetailsreportid3.push(defaultobj);
for(let i=0; i<datareportid2.length; i++){
var obj= { value: datareportid2[i].configkey, title: datareportid2[i].configtext};
this.databodashboarddetailsreportid3.push(obj);
}
var clone = this.sharedService.clone(this.tblbodashboarddetailssource.settings);
if(clone.columns['reportid']!=undefined)clone.columns['reportid'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databodashboarddetailsreportid3)), }, };
if(clone.columns['reportid']!=undefined)clone.columns['reportid'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databodashboarddetailsreportid3)), }, };
this.tblbodashboarddetailssource.settings =  clone;
this.tblbodashboarddetailssource.initGrid();
});
}
this.bfilterPopulatebodashboarddetails=true;
}
async bodashboarddetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbodashboarddetailsTableConfig()
{
this.bodashboarddetailssettings = {
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
dashboardname: {
title: 'Dashboard Name',
type: '',
filter:true,
},
title: {
title: 'Title',
type: '',
filter:true,
},
row: {
title: 'Row',
type: 'number',
filter:true,
},
col: {
title: 'Col',
type: 'number',
filter:true,
},
charttype: {
title: 'Chart Type',
type: '',
filter:true,
},
tablename: {
title: 'Table Name',
type: '',
filter:true,
},
recordname: {
title: 'Record Name',
type: '',
filter:true,
},
parameter: {
title: 'Parameter',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
name: {
title: 'Name',
type: '',
filter:true,
},
value: {
title: 'Value',
type: '',
filter:true,
},
parameter1variable: {
title: 'Parameter1 Variable',
type: '',
filter:true,
},
parameter1type: {
title: 'Parameter1 Type',
type: 'number',
filter:true,
},
parameter1datetype: {
title: 'Parameter1 Date Type',
type: '',
filter:true,
},
parameter2variable: {
title: 'Parameter2 Variable',
type: '',
filter:true,
},
parameter2type: {
title: 'Parameter2 Type',
type: 'number',
filter:true,
},
parameter2datetype: {
title: 'Parameter2 Date Type',
type: '',
filter:true,
},
parameter3variable: {
title: 'Parameter3 Variable',
type: '',
filter:true,
},
parameter3type: {
title: 'Parameter3 Type',
type: 'number',
filter:true,
},
parameter3datetype: {
title: 'Parameter3 Date Type',
type: '',
filter:true,
},
backgroundcolor: {
title: 'Background Color',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
hoverbackgroundcolor: {
title: 'Hover Background Color',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
bordercolor: {
title: 'Border Color',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
menuid: {
title: 'Menu',
type: 'number',
filter:true,
},
reportid: {
title: 'Report',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databodashboarddetailsreportid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
helptext: {
title: 'Help Text',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
bodashboarddetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bodashboarddetailsID)>=0)
{
this.bodashboarddetailssource=new LocalDataSource();
this.bodashboarddetailssource.load(this.bodashboardservice.bodashboarddetails as  any as LocalDataSource);
this.bodashboarddetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bodashboarddetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bodashboardservice.bodashboarddetails.length == 0)
{
    this.tblbodashboarddetailssource.grid.createFormShown = true;
}
else
{
    let obj = new bodashboarddetail();
    this.bodashboardservice.bodashboarddetails.push(obj);
    this.bodashboarddetailssource.refresh();
    if ((this.bodashboardservice.bodashboarddetails.length / this.bodashboarddetailssource.getPaging().perPage).toFixed(0) + 1 != this.bodashboarddetailssource.getPaging().page)
    {
        this.bodashboarddetailssource.setPage((this.bodashboardservice.bodashboarddetails.length / this.bodashboarddetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbodashboarddetailssource.grid.edit(this.tblbodashboarddetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bodashboarddetailssource.data.indexOf(event.data);
this.onDeletebodashboarddetail(event,event.data.dashboarddetailid,((this.bodashboarddetailssource.getPaging().page-1) *this.bodashboarddetailssource.getPaging().perPage)+index);
this.bodashboarddetailssource.refresh();
break;
}
}

*/
bodashboarddetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbodashboarddetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbodashboarddetail(event,event.data.dashboarddetailid,this.formid);
break;
case 'delete':
this.onDeletebodashboarddetail(event,event.data.dashboarddetailid,((this.bodashboarddetailssource.getPaging().page-1) *this.bodashboarddetailssource.getPaging().perPage)+event.index);
this.bodashboarddetailssource.refresh();
break;
}
}
bodashboarddetailsonDelete(obj) {
let dashboarddetailid=obj.data.dashboarddetailid;
if (confirm('Are you sure to delete this record ?')) {
this.bodashboardservice.deletebodashboard(dashboarddetailid).then(res=>
this.bodashboarddetailsLoadTable()
);
}
}
bodashboarddetailsPaging(val)
{
debugger;
this.bodashboarddetailssource.setPaging(1, val, true);
}

handlebodashboarddetailsGridSelected(event:any) {
this.bodashboarddetailsselectedindex=this.bodashboardservice.bodashboarddetails.findIndex(i => i.dashboarddetailid === event.data.dashboarddetailid);
}
IsbodashboarddetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bodashboarddetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bodashboarddetails

}



