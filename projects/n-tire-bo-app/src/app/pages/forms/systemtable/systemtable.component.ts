import { systemtableService } from './../../../service/systemtable.service';
import { systemtable } from './../../../model/systemtable.model';
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
import { systemtabletemplate } from './../../../model/systemtabletemplate.model';
import { systemtabletemplateComponent } from './../../../pages/forms/systemtabletemplate/systemtabletemplate.component';
//FK services
import { bouserrolemaster,IbouserrolemasterResponse } from './../../../model/bouserrolemaster.model';
import { bouserrolemasterComponent } from './../../../pages/forms/bouserrolemaster/bouserrolemaster.component';
import { bouserrolemasterService } from './../../../service/bouserrolemaster.service';
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
selector: 'app-systemtable',
templateUrl: './systemtable.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class systemtableComponent implements OnInit {
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
bfilterPopulatesystemtables:boolean=false;
datasystemtablesremindercolorcode3:any=[];
datasystemtablesreminderpriority3:any=[];
datasystemtablesremindericon3:any=[];
datasystemtabletemplatesuserroleid3:any=[];
bfilterPopulatesystemtabletemplates:boolean=false;
@ViewChild('tblsystemtabletemplatessource',{static:false}) tblsystemtabletemplatessource: Ng2SmartTableComponent;
 systemtableForm: FormGroup;
remindercolorcodeList: boconfigvalue[];
reminderpriorityList: boconfigvalue[];
remindericonList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



systemtabletemplatesvisiblelist:any;
systemtabletemplateshidelist:any;

DeletedsystemtabletemplateIDs: string="";
systemtabletemplatesID: string = "1";
systemtabletemplatesselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private systemtableservice: systemtableService,
private bouserrolemasterservice: bouserrolemasterService,
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
this.systemtableForm  = this.fb.group({
pk:[null],
tableid: [null],
tablecode: [null],
tablename: [null],
insertaction: [null],
updateaction: [null],
deleteaction: [null],
workflow: [null],
remindercolorcode: [null],
remindercolorcodedesc: [null],
reminderpriority: [null],
reminderprioritydesc: [null],
remindericon: [null],
remindericondesc: [null],
documentadminusers: [null],
documentsecurity: [null],
attachmentcategory: [null],
noattachmentdelete: [null],
audittrailenabled: [null],
audittrailview: [null],
audittrailfields: [null],
versionmaintenance: [null],
documentcontrolenabled: [null],
documentsharingenabled: [null],
fieldstyles: [null],
notifyusersoncreation: [null],
notifyusersonupdation: [null],
notifyusersondeletion: [null],
notifyusersonviewing: [null],
recordaccesscondition: [null],
recordnoaccesscondition: [null],
folderview: [null],
metatagfields: [null],
digitalsignature: [null],
viewhtml: [null],
templatehtml: [null],
helptext: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.systemtableForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.systemtableForm.dirty && this.systemtableForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.tableid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.tableid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.tableid && pkDetail) {
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
let systemtableid = null;

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
this.formid=systemtableid;
//this.sharedService.alert(systemtableid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetsystemtabletemplatesTableConfig();
  setTimeout(() => {
  this.SetsystemtabletemplatesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("color").then(res => this.remindercolorcodeList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.reminderpriorityList = res as boconfigvalue[]);
this.configservice.getList("icon").then(res => this.remindericonList = res as boconfigvalue[]);

//autocomplete
    this.systemtableservice.getsystemtablesList().then(res => {
      this.pkList = res as systemtable[];
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
this.systemtableForm.markAsUntouched();
this.systemtableForm.markAsPristine();
}



resetForm() {
if (this.systemtableForm != null)
this.systemtableForm.reset();
this.systemtableForm.patchValue({
});
setTimeout(() => {
this.systemtableservice.systemtabletemplates=[];
this.systemtabletemplatesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let tableid = this.systemtableForm.get('tableid').value;
        if(tableid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.systemtableservice.deletesystemtable(tableid).then(res =>
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
    this.systemtableForm.patchValue({
        tableid: null
    });
    if(this.systemtableservice.formData.tableid!=null)this.systemtableservice.formData.tableid=null;
for (let i=0;i<this.systemtableservice.systemtabletemplates.length;i++) {
this.systemtableservice.systemtabletemplates[i].tabledetailid=null;
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
this.systemtableForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.systemtableForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.systemtableForm.controls[key]!=undefined)this.systemtableForm.controls[key].disable({onlySelf: true});
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
remindercolorcodeonChange(evt:any){
let e=this.f.remindercolorcode.value as any;
this.systemtableForm.patchValue({remindercolorcodedesc:evt.options[evt.options.selectedIndex].text});
}
reminderpriorityonChange(evt:any){
let e=this.f.reminderpriority.value as any;
this.systemtableForm.patchValue({reminderprioritydesc:evt.options[evt.options.selectedIndex].text});
}
remindericononChange(evt:any){
let e=this.f.remindericon.value as any;
this.systemtableForm.patchValue({remindericondesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){
this.systemtableservice.getsystemtablesByEID(pkcol).then(res => {

this.systemtableservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.systemtable.tableid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.systemtable.tableid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.systemtableForm.patchValue({
tableid: res.systemtable.tableid,
tablecode: res.systemtable.tablecode,
tablename: res.systemtable.tablename,
insertaction: res.systemtable.insertaction,
updateaction: res.systemtable.updateaction,
deleteaction: res.systemtable.deleteaction,
workflow: res.systemtable.workflow,
remindercolorcode: res.systemtable.remindercolorcode,
remindercolorcodedesc: res.systemtable.remindercolorcodedesc,
reminderpriority: res.systemtable.reminderpriority,
reminderprioritydesc: res.systemtable.reminderprioritydesc,
remindericon: res.systemtable.remindericon,
remindericondesc: res.systemtable.remindericondesc,
documentadminusers: res.systemtable.documentadminusers,
documentsecurity: res.systemtable.documentsecurity,
attachmentcategory: res.systemtable.attachmentcategory,
noattachmentdelete: res.systemtable.noattachmentdelete,
audittrailenabled: res.systemtable.audittrailenabled,
audittrailview: res.systemtable.audittrailview,
audittrailfields: res.systemtable.audittrailfields,
versionmaintenance: res.systemtable.versionmaintenance,
documentcontrolenabled: res.systemtable.documentcontrolenabled,
documentsharingenabled: res.systemtable.documentsharingenabled,
fieldstyles: res.systemtable.fieldstyles,
notifyusersoncreation: res.systemtable.notifyusersoncreation,
notifyusersonupdation: res.systemtable.notifyusersonupdation,
notifyusersondeletion: res.systemtable.notifyusersondeletion,
notifyusersonviewing: res.systemtable.notifyusersonviewing,
recordaccesscondition: res.systemtable.recordaccesscondition,
recordnoaccesscondition: res.systemtable.recordnoaccesscondition,
folderview: res.systemtable.folderview,
metatagfields: res.systemtable.metatagfields,
digitalsignature: res.systemtable.digitalsignature,
viewhtml: res.systemtable.viewhtml,
templatehtml: res.systemtable.templatehtml,
helptext: res.systemtable.helptext,
status: res.systemtable.status,
statusdesc: res.systemtable.statusdesc,
});
this.systemtabletemplatesvisiblelist=res.systemtabletemplatesvisiblelist;
//Child Tables if any
this.systemtableservice.systemtabletemplates = res.systemtabletemplates;
this.SetsystemtabletemplatesTableConfig();
this.systemtabletemplatesLoadTable();
  setTimeout(() => {
  this.SetsystemtabletemplatesTableddConfig();
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
  for (let key in this.systemtableForm.controls) {
    if (this.systemtableForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.systemtableForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.systemtableForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.systemtableForm.value;
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
Object.keys(this.systemtableForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.systemtableForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.systemtableForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.systemtableservice.formData=this.systemtableForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.systemtableForm.controls[key] != null)
    {
        this.systemtableservice.formData[key] = this.systemtableForm.controls[key].value;
    }
}
}
}
this.systemtableservice.formData.DeletedsystemtabletemplateIDs = this.DeletedsystemtabletemplateIDs;
console.log(this.systemtableservice.formData);
this.systemtableservice.formData=this.systemtableForm.value;
this.systemtableservice.saveOrUpdatesystemtables().subscribe(
async res => {
if (this.systemtabletemplatessource.data)
{
    for (let i = 0; i < this.systemtabletemplatessource.data.length; i++)
    {
        if (this.systemtabletemplatessource.data[i].fileattachmentlist)await this.sharedService.upload(this.systemtabletemplatessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.systemtable);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.systemtableservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.systemtable);
}
else
{
this.FillData(res);
}
}
this.systemtableForm.markAsUntouched();
this.systemtableForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditsystemtabletemplate(event:any,tabledetailid:any, tableid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(systemtabletemplateComponent, 
{
data:  {  showview:this.showview,save:false,event,tabledetailid, tableid,visiblelist:this.systemtabletemplatesvisiblelist,  hidelist:this.systemtabletemplateshidelist,ScreenType:2  },
header: 'Templates'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.systemtabletemplatessource.add(res);
this.systemtabletemplatessource.refresh();
}
else
{
this.systemtabletemplatessource.update(event.data, res);
}
}
});
}

onDeletesystemtabletemplate(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedsystemtabletemplateIDs += childID + ",";
this.systemtableservice.systemtabletemplates.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes systemtabletemplates
systemtabletemplatessettings:any;
systemtabletemplatessource: any;

showsystemtabletemplatesCheckbox()
{
debugger;
if(this.tblsystemtabletemplatessource.settings['selectMode']== 'multi')this.tblsystemtabletemplatessource.settings['selectMode']= 'single';
else
this.tblsystemtabletemplatessource.settings['selectMode']= 'multi';
this.tblsystemtabletemplatessource.initGrid();
}
deletesystemtabletemplatesAll()
{
this.tblsystemtabletemplatessource.settings['selectMode'] = 'single';
}
showsystemtabletemplatesFilter()
{
  setTimeout(() => {
  this.SetsystemtabletemplatesTableddConfig();
  });
      if(this.tblsystemtabletemplatessource.settings!=null)this.tblsystemtabletemplatessource.settings['hideSubHeader'] =!this.tblsystemtabletemplatessource.settings['hideSubHeader'];
this.tblsystemtabletemplatessource.initGrid();
}
showsystemtabletemplatesInActive()
{
}
enablesystemtabletemplatesInActive()
{
}
async SetsystemtabletemplatesTableddConfig()
{
if(!this.bfilterPopulatesystemtabletemplates){

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var datauserroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datasystemtabletemplatesuserroleid3.push(defaultobj);
for(let i=0; i<datauserroleid2.length; i++){
var obj= { value: datauserroleid2[i].userroleid, title:datauserroleid2[i].userrole};
this.datasystemtabletemplatesuserroleid3.push(obj);
}
if((this.tblsystemtabletemplatessource.settings as any).columns['userroleid'])
{
(this.tblsystemtabletemplatessource.settings as any).columns['userroleid'].editor.config.list=JSON.parse(JSON.stringify(this.datasystemtabletemplatesuserroleid3));
this.tblsystemtabletemplatessource.initGrid();
}
});
}
this.bfilterPopulatesystemtabletemplates=true;
}
async systemtabletemplatesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetsystemtabletemplatesTableConfig()
{
this.systemtabletemplatessettings = {
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
userroleid: {
title: 'User Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datasystemtabletemplatesuserroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
viewhtml: {
title: 'View Html',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
templatehtml: {
title: 'Template Html',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
visiblefields: {
title: 'Visible Fields',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
hidefields: {
title: 'Hide Fields',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
systemtabletemplatesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.systemtabletemplatesID)>=0)
{
this.systemtabletemplatessource=new LocalDataSource();
this.systemtabletemplatessource.load(this.systemtableservice.systemtabletemplates as  any as LocalDataSource);
this.systemtabletemplatessource.setPaging(1, 20, true);
}
}

//external to inline
/*
systemtabletemplatesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.systemtableservice.systemtabletemplates.length == 0)
{
    this.tblsystemtabletemplatessource.grid.createFormShown = true;
}
else
{
    let obj = new systemtabletemplate();
    this.systemtableservice.systemtabletemplates.push(obj);
    this.systemtabletemplatessource.refresh();
    if ((this.systemtableservice.systemtabletemplates.length / this.systemtabletemplatessource.getPaging().perPage).toFixed(0) + 1 != this.systemtabletemplatessource.getPaging().page)
    {
        this.systemtabletemplatessource.setPage((this.systemtableservice.systemtabletemplates.length / this.systemtabletemplatessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblsystemtabletemplatessource.grid.edit(this.tblsystemtabletemplatessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.systemtabletemplatessource.data.indexOf(event.data);
this.onDeletesystemtabletemplate(event,event.data.tabledetailid,((this.systemtabletemplatessource.getPaging().page-1) *this.systemtabletemplatessource.getPaging().perPage)+index);
this.systemtabletemplatessource.refresh();
break;
}
}

*/
systemtabletemplatesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditsystemtabletemplate(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditsystemtabletemplate(event,event.data.tabledetailid,this.formid);
break;
case 'delete':
this.onDeletesystemtabletemplate(event,event.data.tabledetailid,((this.systemtabletemplatessource.getPaging().page-1) *this.systemtabletemplatessource.getPaging().perPage)+event.index);
this.systemtabletemplatessource.refresh();
break;
}
}
systemtabletemplatesonDelete(obj) {
let tabledetailid=obj.data.tabledetailid;
if (confirm('Are you sure to delete this record ?')) {
this.systemtableservice.deletesystemtable(tabledetailid).then(res=>
this.systemtabletemplatesLoadTable()
);
}
}
systemtabletemplatesPaging(val)
{
debugger;
this.systemtabletemplatessource.setPaging(1, val, true);
}

handlesystemtabletemplatesGridSelected(event:any) {
this.systemtabletemplatesselectedindex=this.systemtableservice.systemtabletemplates.findIndex(i => i.tabledetailid === event.data.tabledetailid);
}
IssystemtabletemplatesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.systemtabletemplatesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes systemtabletemplates

}



