import { boprocesstaskService } from './../../../service/boprocesstask.service';
import { boprocesstask } from './../../../model/boprocesstask.model';
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
import { boprocesstaskform } from './../../../model/boprocesstaskform.model';
//FK services
import { boprocesstaskformComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boprocesstaskform/boprocesstaskform.component';
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
selector: 'app-boprocesstask',
templateUrl: './boprocesstask.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boprocesstaskComponent implements OnInit {
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
bfilterPopulateboprocesstasks:boolean=false;
databoprocesstasksperformancestatus3:any=[];
databoprocesstasksstandard3:any=[];
bfilterPopulateboprocesstaskforms:boolean=false;
@ViewChild('tblboprocesstaskformssource',{static:false}) tblboprocesstaskformssource: Ng2SmartTableComponent;
 boprocesstaskForm: FormGroup;
performancestatusList: boconfigvalue[];
standardList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



boprocesstaskformsvisiblelist:any;
boprocesstaskformshidelist:any;

DeletedboprocesstaskformIDs: string="";
boprocesstaskformsID: string = "1";
boprocesstaskformsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private boprocesstaskservice: boprocesstaskService,
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
this.boprocesstaskForm  = this.fb.group({pk:[null],taskprocessid: [null],
processgroupid: [null],
processid: [null],
assigneduser: [null],
assigneddatetime: [null],
closeddatetime: [null],
description: [null],
details: [null],
performancestatus: [null],
performancestatusdesc: [null],
standard: [null],
standarddesc: [null],
exception: [null],
allcomments: [null],
comments: [null],
status: [null],
statusdesc: [null],
sourcefield: [null],
keyid: [null],
keyiddesc: [null],
});
}

get f() { return this.boprocesstaskForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boprocesstaskForm.dirty && this.boprocesstaskForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.taskprocessid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.taskprocessid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.taskprocessid && pkDetail) {
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
let boprocesstaskid = null;

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
this.formid=boprocesstaskid;
//this.sharedService.alert(boprocesstaskid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetboprocesstaskformsTableConfig();
  setTimeout(() => {
  this.SetboprocesstaskformsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("performancestatus").then(res => this.performancestatusList = res as boconfigvalue[]);
this.configservice.getList("standard").then(res => this.standardList = res as boconfigvalue[]);

//autocomplete
    this.boprocesstaskservice.getboprocesstasksList().then(res => {
      this.pkList = res as boprocesstask[];
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
this.boprocesstaskForm.markAsUntouched();
this.boprocesstaskForm.markAsPristine();
}



resetForm() {
if (this.boprocesstaskForm != null)
this.boprocesstaskForm.reset();
this.boprocesstaskForm.patchValue({
});
setTimeout(() => {
this.boprocesstaskservice.boprocesstaskforms=[];
this.boprocesstaskformsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let taskprocessid = this.boprocesstaskForm.get('taskprocessid').value;
        if(taskprocessid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boprocesstaskservice.deleteboprocesstask(taskprocessid).then(res =>
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
    this.boprocesstaskForm.patchValue({
        taskprocessid: null
    });
    if(this.boprocesstaskservice.formData.taskprocessid!=null)this.boprocesstaskservice.formData.taskprocessid=null;
for (let i=0;i<this.boprocesstaskservice.boprocesstaskforms.length;i++) {
this.boprocesstaskservice.boprocesstaskforms[i].taskformid=null;
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
        else if(key=="assigneddatetime")
this.boprocesstaskForm.patchValue({"assigneddatetime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="closeddatetime")
this.boprocesstaskForm.patchValue({"closeddatetime":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.boprocesstaskForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boprocesstaskForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boprocesstaskForm.controls[key]!=undefined)this.boprocesstaskForm.controls[key].disable({onlySelf: true});
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
performancestatusonChange(evt:any){
let e=this.f.performancestatus.value as any;
this.boprocesstaskForm.patchValue({performancestatusdesc:evt.options[evt.options.selectedIndex].text});
}
standardonChange(evt:any){
let e=this.f.standard.value as any;
this.boprocesstaskForm.patchValue({standarddesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){
this.boprocesstaskservice.getboprocesstasksByEID(pkcol).then(res => {

this.boprocesstaskservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boprocesstask.taskprocessid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boprocesstask.taskprocessid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boprocesstaskForm.patchValue({
taskprocessid: res.boprocesstask.taskprocessid,
processgroupid: res.boprocesstask.processgroupid,
processid: res.boprocesstask.processid,
assigneduser: res.boprocesstask.assigneduser,
assigneddatetime: this.ngbDateParserFormatter.parse(res.boprocesstask.assigneddatetime),
closeddatetime: this.ngbDateParserFormatter.parse(res.boprocesstask.closeddatetime),
description: res.boprocesstask.description,
details: res.boprocesstask.details,
performancestatus: res.boprocesstask.performancestatus,
performancestatusdesc: res.boprocesstask.performancestatusdesc,
standard: res.boprocesstask.standard,
standarddesc: res.boprocesstask.standarddesc,
exception: res.boprocesstask.exception,
allcomments: res.boprocesstask.allcomments,
comments: res.boprocesstask.comments,
status: res.boprocesstask.status,
statusdesc: res.boprocesstask.statusdesc,
sourcefield: res.boprocesstask.sourcefield,
keyid: res.boprocesstask.keyid,
keyiddesc: res.boprocesstask.keyiddesc,
});
this.boprocesstaskformsvisiblelist=res.boprocesstaskformsvisiblelist;
//Child Tables if any
this.boprocesstaskservice.boprocesstaskforms = res.boprocesstaskforms;
this.SetboprocesstaskformsTableConfig();
this.boprocesstaskformsLoadTable();
  setTimeout(() => {
  this.SetboprocesstaskformsTableddConfig();
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
  for (let key in this.boprocesstaskForm.controls) {
    if (this.boprocesstaskForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boprocesstaskForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boprocesstaskForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.boprocesstaskForm.value;
obj.assigneddatetime=new Date(this.boprocesstaskForm.get('assigneddatetime').value ? this.ngbDateParserFormatter.format(this.boprocesstaskForm.get('assigneddatetime').value)+'  UTC' :null);
obj.closeddatetime=new Date(this.boprocesstaskForm.get('closeddatetime').value ? this.ngbDateParserFormatter.format(this.boprocesstaskForm.get('closeddatetime').value)+'  UTC' :null);
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
Object.keys(this.boprocesstaskForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boprocesstaskForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boprocesstaskForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boprocesstaskservice.formData=this.boprocesstaskForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boprocesstaskForm.controls[key] != null)
    {
        this.boprocesstaskservice.formData[key] = this.boprocesstaskForm.controls[key].value;
    }
}
}
}
this.boprocesstaskservice.formData.assigneddatetime=new Date(this.boprocesstaskForm.get('assigneddatetime').value ? this.ngbDateParserFormatter.format(this.boprocesstaskForm.get('assigneddatetime').value)+'  UTC' :null);
this.boprocesstaskservice.formData.closeddatetime=new Date(this.boprocesstaskForm.get('closeddatetime').value ? this.ngbDateParserFormatter.format(this.boprocesstaskForm.get('closeddatetime').value)+'  UTC' :null);
this.boprocesstaskservice.formData.DeletedboprocesstaskformIDs = this.DeletedboprocesstaskformIDs;
console.log(this.boprocesstaskservice.formData);
this.boprocesstaskservice.formData=this.boprocesstaskForm.value;
this.boprocesstaskservice.saveOrUpdateboprocesstasks().subscribe(
async res => {
if (this.boprocesstaskformssource.data)
{
    for (let i = 0; i < this.boprocesstaskformssource.data.length; i++)
    {
        if (this.boprocesstaskformssource.data[i].fileattachmentlist)await this.sharedService.upload(this.boprocesstaskformssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boprocesstask);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boprocesstaskservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boprocesstask);
}
else
{
this.FillData(res);
}
}
this.boprocesstaskForm.markAsUntouched();
this.boprocesstaskForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditboprocesstaskform(event:any,taskformid:any, taskprocessid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boprocesstaskformComponent, 
{
data:  {  showview:this.showview,save:false,event,taskformid, taskprocessid,visiblelist:this.boprocesstaskformsvisiblelist,  hidelist:this.boprocesstaskformshidelist,ScreenType:2  },
header: 'Forms'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boprocesstaskformssource.add(res);
this.boprocesstaskformssource.refresh();
}
else
{
this.boprocesstaskformssource.update(event.data, res);
}
}
});
}

onDeleteboprocesstaskform(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboprocesstaskformIDs += childID + ",";
this.boprocesstaskservice.boprocesstaskforms.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes boprocesstaskforms
boprocesstaskformssettings:any;
boprocesstaskformssource: any;

showboprocesstaskformsCheckbox()
{
debugger;
if(this.tblboprocesstaskformssource.settings['selectMode']== 'multi')this.tblboprocesstaskformssource.settings['selectMode']= 'single';
else
this.tblboprocesstaskformssource.settings['selectMode']= 'multi';
this.tblboprocesstaskformssource.initGrid();
}
deleteboprocesstaskformsAll()
{
this.tblboprocesstaskformssource.settings['selectMode'] = 'single';
}
showboprocesstaskformsFilter()
{
  setTimeout(() => {
  this.SetboprocesstaskformsTableddConfig();
  });
      if(this.tblboprocesstaskformssource.settings!=null)this.tblboprocesstaskformssource.settings['hideSubHeader'] =!this.tblboprocesstaskformssource.settings['hideSubHeader'];
this.tblboprocesstaskformssource.initGrid();
}
showboprocesstaskformsInActive()
{
}
enableboprocesstaskformsInActive()
{
}
async SetboprocesstaskformsTableddConfig()
{
if(!this.bfilterPopulateboprocesstaskforms){
}
this.bfilterPopulateboprocesstaskforms=true;
}
async boprocesstaskformsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboprocesstaskformsTableConfig()
{
this.boprocesstaskformssettings = {
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
processid: {
title: 'Process',
type: 'number',
filter:true,
},
formid: {
title: 'Form',
type: 'number',
filter:true,
},
formiddesc: {
title: 'Formiddesc',
type: '',
filter:true,
},
customfield: {
title: 'Custom Field',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
return this.sharedService.getCustomValue(cell);
},
},
attachment: {
title: 'Attachment',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
return this.sharedService.getAttachmentValue(cell);
},
},
},
};
}
boprocesstaskformsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boprocesstaskformsID)>=0)
{
this.boprocesstaskformssource=new LocalDataSource();
this.boprocesstaskformssource.load(this.boprocesstaskservice.boprocesstaskforms as  any as LocalDataSource);
this.boprocesstaskformssource.setPaging(1, 20, true);
}
}

//external to inline
/*
boprocesstaskformsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.boprocesstaskservice.boprocesstaskforms.length == 0)
{
    this.tblboprocesstaskformssource.grid.createFormShown = true;
}
else
{
    let obj = new boprocesstaskform();
    this.boprocesstaskservice.boprocesstaskforms.push(obj);
    this.boprocesstaskformssource.refresh();
    if ((this.boprocesstaskservice.boprocesstaskforms.length / this.boprocesstaskformssource.getPaging().perPage).toFixed(0) + 1 != this.boprocesstaskformssource.getPaging().page)
    {
        this.boprocesstaskformssource.setPage((this.boprocesstaskservice.boprocesstaskforms.length / this.boprocesstaskformssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboprocesstaskformssource.grid.edit(this.tblboprocesstaskformssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boprocesstaskformssource.data.indexOf(event.data);
this.onDeleteboprocesstaskform(event,event.data.taskformid,((this.boprocesstaskformssource.getPaging().page-1) *this.boprocesstaskformssource.getPaging().perPage)+index);
this.boprocesstaskformssource.refresh();
break;
}
}

*/
boprocesstaskformsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboprocesstaskform(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboprocesstaskform(event,event.data.taskformid,this.formid);
break;
case 'delete':
this.onDeleteboprocesstaskform(event,event.data.taskformid,((this.boprocesstaskformssource.getPaging().page-1) *this.boprocesstaskformssource.getPaging().perPage)+event.index);
this.boprocesstaskformssource.refresh();
break;
}
}
boprocesstaskformsonDelete(obj) {
let taskformid=obj.data.taskformid;
if (confirm('Are you sure to delete this record ?')) {
this.boprocesstaskservice.deleteboprocesstask(taskformid).then(res=>
this.boprocesstaskformsLoadTable()
);
}
}
boprocesstaskformsPaging(val)
{
debugger;
this.boprocesstaskformssource.setPaging(1, val, true);
}

handleboprocesstaskformsGridSelected(event:any) {
this.boprocesstaskformsselectedindex=this.boprocesstaskservice.boprocesstaskforms.findIndex(i => i.taskformid === event.data.taskformid);
}
IsboprocesstaskformsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boprocesstaskformsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boprocesstaskforms

}



