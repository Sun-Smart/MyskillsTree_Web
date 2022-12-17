import { boprocessmasterService } from './../../../service/boprocessmaster.service';
import { boprocessmaster } from './../../../model/boprocessmaster.model';
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
import { bosubcategorymaster} from './../../../model/bosubcategorymaster.model';
import { bosubcategorymasterService } from './../../../service/bosubcategorymaster.service';
//popups
//detail table services
import { boprocessform } from './../../../model/boprocessform.model';
//FK services
import { boprocessformComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boprocessform/boprocessform.component';
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
selector: 'app-boprocessmaster',
templateUrl: './boprocessmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boprocessmasterComponent implements OnInit {
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
bfilterPopulateboprocessmasters:boolean=false;
databoprocessmastersprocessgroupid3:any=[];
databoprocessmastersformtype3:any=[];
bfilterPopulateboprocessforms:boolean=false;
@ViewChild('tblboprocessformssource',{static:false}) tblboprocessformssource: Ng2SmartTableComponent;
 boprocessmasterForm: FormGroup;
processgroupidList: bosubcategorymaster[];
formtypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



boprocessformsvisiblelist:any;
boprocessformshidelist:any;

DeletedboprocessformIDs: string="";
boprocessformsID: string = "1";
boprocessformsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private boprocessmasterservice: boprocessmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bosubcategorymasterservice:bosubcategorymasterService,
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
this.boprocessmasterForm  = this.fb.group({pk:[null],processgroupid: [null],
processgroupiddesc: [null],
processmasterid: [null],
ordernumber: [null],
processname: [null],
description: [null],
predecessor: [null],
assigncondition: [null],
approvers: [null],
tathours: [null],
numapprovers: [null],
sendmail: [null],
taskname: [null],
taskdescription: [null],
notificationsubject: [null],
notificationbody: [null],
standardrating: [null],
canstopworkflow: [null],
allowrequestchange: [null],
allowreassignment: [null],
reassignmentsubject: [null],
reassignmentbody: [null],
requestchangesubject: [null],
requestchangebody: [null],
formtype: [null],
formtypedesc: [null],
sourcefield: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.boprocessmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boprocessmasterForm.dirty && this.boprocessmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.processmasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.processmasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.processmasterid && pkDetail) {
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
let boprocessmasterid = null;

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
this.formid=boprocessmasterid;
//this.sharedService.alert(boprocessmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetboprocessformsTableConfig();
  setTimeout(() => {
  this.SetboprocessformsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bosubcategorymasterservice.getbosubcategorymastersList().then(res => 
{
this.processgroupidList = res as bosubcategorymaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("processformtype").then(res => this.formtypeList = res as boconfigvalue[]);

//autocomplete
    this.boprocessmasterservice.getboprocessmastersList().then(res => {
      this.pkList = res as boprocessmaster[];
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
this.boprocessmasterForm.markAsUntouched();
this.boprocessmasterForm.markAsPristine();
}



resetForm() {
if (this.boprocessmasterForm != null)
this.boprocessmasterForm.reset();
this.boprocessmasterForm.patchValue({
});
setTimeout(() => {
this.boprocessmasterservice.boprocessforms=[];
this.boprocessformsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let processmasterid = this.boprocessmasterForm.get('processmasterid').value;
        if(processmasterid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boprocessmasterservice.deleteboprocessmaster(processmasterid).then(res =>
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
    this.boprocessmasterForm.patchValue({
        processmasterid: null
    });
    if(this.boprocessmasterservice.formData.processmasterid!=null)this.boprocessmasterservice.formData.processmasterid=null;
for (let i=0;i<this.boprocessmasterservice.boprocessforms.length;i++) {
this.boprocessmasterservice.boprocessforms[i].processformid=null;
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
this.boprocessmasterForm.patchValue({"tathours":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.boprocessmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boprocessmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boprocessmasterForm.controls[key]!=undefined)this.boprocessmasterForm.controls[key].disable({onlySelf: true});
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
processgroupidonChange(evt:any){
let e=evt.value;
this.boprocessmasterForm.patchValue({processgroupiddesc:evt.options[evt.options.selectedIndex].text});
}
processmasteridonChange(evt:any){
let e=evt.value;
}
ordernumberonChange(evt:any){
let e=evt.value;
}
processnameonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
predecessoronChange(evt:any){
let e=evt.value;
}
assignconditiononChange(evt:any){
let e=evt.value;
}
approversonChange(evt:any){
let e=evt.value;
}
tathoursonChange(evt:any){
let e=evt.value;
}
numapproversonChange(evt:any){
let e=evt.value;
}
sendmailonChange(evt:any){
let e=evt.value;
}
tasknameonChange(evt:any){
let e=evt.value;
}
taskdescriptiononChange(evt:any){
let e=evt.value;
}
notificationsubjectonChange(evt:any){
let e=evt.value;
}
notificationbodyonChange(evt:any){
let e=evt.value;
}
standardratingonChange(evt:any){
let e=evt.value;
}
canstopworkflowonChange(evt:any){
let e=evt.value;
}
allowrequestchangeonChange(evt:any){
let e=evt.value;
}
allowreassignmentonChange(evt:any){
let e=evt.value;
}
reassignmentsubjectonChange(evt:any){
let e=evt.value;
}
reassignmentbodyonChange(evt:any){
let e=evt.value;
}
requestchangesubjectonChange(evt:any){
let e=evt.value;
}
requestchangebodyonChange(evt:any){
let e=evt.value;
}
formtypeonChange(evt:any){
let e=this.f.formtype.value as any;
this.boprocessmasterForm.patchValue({formtypedesc:evt.options[evt.options.selectedIndex].text});
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.boprocessmasterservice.getboprocessmastersByEID(pkcol).then(res => {

this.boprocessmasterservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boprocessmaster.processmasterid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boprocessmaster.processmasterid;
var tathoursTime=new Time( res.boprocessmaster.tathours);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boprocessmasterForm.patchValue({
processgroupid: res.boprocessmaster.processgroupid,
processgroupiddesc: res.boprocessmaster.processgroupiddesc,
processmasterid: res.boprocessmaster.processmasterid,
ordernumber: res.boprocessmaster.ordernumber,
processname: res.boprocessmaster.processname,
description: res.boprocessmaster.description,
predecessor: res.boprocessmaster.predecessor,
assigncondition: res.boprocessmaster.assigncondition,
approvers: res.boprocessmaster.approvers,
tathours: tathoursTime,
numapprovers: res.boprocessmaster.numapprovers,
sendmail: res.boprocessmaster.sendmail,
taskname: res.boprocessmaster.taskname,
taskdescription: res.boprocessmaster.taskdescription,
notificationsubject: res.boprocessmaster.notificationsubject,
notificationbody: res.boprocessmaster.notificationbody,
standardrating: res.boprocessmaster.standardrating,
canstopworkflow: res.boprocessmaster.canstopworkflow,
allowrequestchange: res.boprocessmaster.allowrequestchange,
allowreassignment: res.boprocessmaster.allowreassignment,
reassignmentsubject: res.boprocessmaster.reassignmentsubject,
reassignmentbody: res.boprocessmaster.reassignmentbody,
requestchangesubject: res.boprocessmaster.requestchangesubject,
requestchangebody: res.boprocessmaster.requestchangebody,
formtype: res.boprocessmaster.formtype,
formtypedesc: res.boprocessmaster.formtypedesc,
sourcefield: res.boprocessmaster.sourcefield,
status: res.boprocessmaster.status,
statusdesc: res.boprocessmaster.statusdesc,
});
this.boprocessformsvisiblelist=res.boprocessformsvisiblelist;
//Child Tables if any
this.boprocessmasterservice.boprocessforms = res.boprocessforms;
this.SetboprocessformsTableConfig();
this.boprocessformsLoadTable();
  setTimeout(() => {
  this.SetboprocessformsTableddConfig();
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
  for (let key in this.boprocessmasterForm.controls) {
    if (this.boprocessmasterForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boprocessmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boprocessmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.boprocessmasterForm.value;
obj.tathours=(this.boprocessmasterForm.get('tathours').value==null?0:this.boprocessmasterForm.get('tathours').value.hour)+':'+(this.boprocessmasterForm.get('tathours').value==null?0:this.boprocessmasterForm.get('tathours').value.minute+":00");
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
Object.keys(this.boprocessmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boprocessmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boprocessmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boprocessmasterservice.formData=this.boprocessmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boprocessmasterForm.controls[key] != null)
    {
        this.boprocessmasterservice.formData[key] = this.boprocessmasterForm.controls[key].value;
    }
}
}
}
this.boprocessmasterservice.formData.tathours=(this.boprocessmasterForm.get('tathours').value==null?0:this.boprocessmasterForm.get('tathours').value.hour)+':'+(this.boprocessmasterForm.get('tathours').value==null?0:this.boprocessmasterForm.get('tathours').value.minute+":00");
this.boprocessmasterservice.formData.DeletedboprocessformIDs = this.DeletedboprocessformIDs;
console.log(this.boprocessmasterservice.formData);
this.boprocessmasterservice.formData=this.boprocessmasterForm.value;
this.boprocessmasterservice.saveOrUpdateboprocessmasters().subscribe(
async res => {
if (this.boprocessformssource.data)
{
    for (let i = 0; i < this.boprocessformssource.data.length; i++)
    {
        if (this.boprocessformssource.data[i].fileattachmentlist)await this.sharedService.upload(this.boprocessformssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boprocessmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boprocessmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boprocessmaster);
}
else
{
this.FillData(res);
}
}
this.boprocessmasterForm.markAsUntouched();
this.boprocessmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditprocessgroupid( subcategoryid) {
/*let ScreenType='2';
this.dialog.open(bosubcategorymasterComponent, 
{
data: {subcategoryid:this.boprocessmasterForm.get('processgroupid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditboprocessform(event:any,processformid:any, processmasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boprocessformComponent, 
{
data:  {  showview:this.showview,save:false,event,processformid, processmasterid,visiblelist:this.boprocessformsvisiblelist,  hidelist:this.boprocessformshidelist,ScreenType:2  },
header: 'Process Forms'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boprocessformssource.add(res);
this.boprocessformssource.refresh();
}
else
{
this.boprocessformssource.update(event.data, res);
}
}
});
}

onDeleteboprocessform(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboprocessformIDs += childID + ",";
this.boprocessmasterservice.boprocessforms.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes boprocessforms
boprocessformssettings:any;
boprocessformssource: any;

showboprocessformsCheckbox()
{
debugger;
if(this.tblboprocessformssource.settings['selectMode']== 'multi')this.tblboprocessformssource.settings['selectMode']= 'single';
else
this.tblboprocessformssource.settings['selectMode']= 'multi';
this.tblboprocessformssource.initGrid();
}
deleteboprocessformsAll()
{
this.tblboprocessformssource.settings['selectMode'] = 'single';
}
showboprocessformsFilter()
{
  setTimeout(() => {
  this.SetboprocessformsTableddConfig();
  });
      if(this.tblboprocessformssource.settings!=null)this.tblboprocessformssource.settings['hideSubHeader'] =!this.tblboprocessformssource.settings['hideSubHeader'];
this.tblboprocessformssource.initGrid();
}
showboprocessformsInActive()
{
}
enableboprocessformsInActive()
{
}
async SetboprocessformsTableddConfig()
{
if(!this.bfilterPopulateboprocessforms){
}
this.bfilterPopulateboprocessforms=true;
}
async boprocessformsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboprocessformsTableConfig()
{
this.boprocessformssettings = {
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
processgroupid: {
title: 'Process Group',
type: 'number',
filter:true,
},
formtype: {
title: 'Form Type',
type: '',
filter:true,
},
formid: {
title: 'Form',
type: 'number',
filter:true,
},
formiddesc: {
title: 'Form Iddesc',
type: '',
filter:true,
},
menuid: {
title: 'Menu',
type: 'number',
filter:true,
},
menuiddesc: {
title: 'Menu Iddesc',
type: '',
filter:true,
},
orderno: {
title: 'Order No',
type: 'number',
filter:true,
},
},
};
}
boprocessformsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boprocessformsID)>=0)
{
this.boprocessformssource=new LocalDataSource();
this.boprocessformssource.load(this.boprocessmasterservice.boprocessforms as  any as LocalDataSource);
this.boprocessformssource.setPaging(1, 20, true);
}
}

//external to inline
/*
boprocessformsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.boprocessmasterservice.boprocessforms.length == 0)
{
    this.tblboprocessformssource.grid.createFormShown = true;
}
else
{
    let obj = new boprocessform();
    this.boprocessmasterservice.boprocessforms.push(obj);
    this.boprocessformssource.refresh();
    if ((this.boprocessmasterservice.boprocessforms.length / this.boprocessformssource.getPaging().perPage).toFixed(0) + 1 != this.boprocessformssource.getPaging().page)
    {
        this.boprocessformssource.setPage((this.boprocessmasterservice.boprocessforms.length / this.boprocessformssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboprocessformssource.grid.edit(this.tblboprocessformssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boprocessformssource.data.indexOf(event.data);
this.onDeleteboprocessform(event,event.data.processformid,((this.boprocessformssource.getPaging().page-1) *this.boprocessformssource.getPaging().perPage)+index);
this.boprocessformssource.refresh();
break;
}
}

*/
boprocessformsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboprocessform(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboprocessform(event,event.data.processformid,this.formid);
break;
case 'delete':
this.onDeleteboprocessform(event,event.data.processformid,((this.boprocessformssource.getPaging().page-1) *this.boprocessformssource.getPaging().perPage)+event.index);
this.boprocessformssource.refresh();
break;
}
}
boprocessformsonDelete(obj) {
let processformid=obj.data.processformid;
if (confirm('Are you sure to delete this record ?')) {
this.boprocessmasterservice.deleteboprocessmaster(processformid).then(res=>
this.boprocessformsLoadTable()
);
}
}
boprocessformsPaging(val)
{
debugger;
this.boprocessformssource.setPaging(1, val, true);
}

handleboprocessformsGridSelected(event:any) {
this.boprocessformsselectedindex=this.boprocessmasterservice.boprocessforms.findIndex(i => i.processformid === event.data.processformid);
}
IsboprocessformsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boprocessformsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boprocessforms

}



