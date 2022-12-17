import { boscheduleService } from './../../../service/boschedule.service';
import { boschedule } from './../../../model/boschedule.model';
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
import { boschedulerun } from './../../../model/boschedulerun.model';
//FK services
import { boschedulerunComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boschedulerun/boschedulerun.component';
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
selector: 'app-boschedule',
templateUrl: './boschedule.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boscheduleComponent implements OnInit {
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
bfilterPopulateboschedules:boolean=false;
databoschedulesfrequency3:any=[];
bfilterPopulateboscheduleruns:boolean=false;
@ViewChild('tblboschedulerunssource',{static:false}) tblboschedulerunssource: Ng2SmartTableComponent;
 boscheduleForm: FormGroup;
frequencyList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



boschedulerunsvisiblelist:any;
boschedulerunshidelist:any;

DeletedboschedulerunIDs: string="";
boschedulerunsID: string = "1";
boschedulerunsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private boscheduleservice: boscheduleService,
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
this.boscheduleForm  = this.fb.group({pk:[null],scheduleid: [null],
sourcefield: [null],
sourcereference: [null],
procedurename: [null],
frequency: [null],
frequencydesc: [null],
notifiers: [null],
lastrundate: [null],
successrate: [null],
failurerate: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.boscheduleForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boscheduleForm.dirty && this.boscheduleForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.scheduleid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.scheduleid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.scheduleid && pkDetail) {
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
let boscheduleid = null;

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
this.formid=boscheduleid;
//this.sharedService.alert(boscheduleid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetboschedulerunsTableConfig();
  setTimeout(() => {
  this.SetboschedulerunsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("frequency").then(res => this.frequencyList = res as boconfigvalue[]);

//autocomplete
    this.boscheduleservice.getboschedulesList().then(res => {
      this.pkList = res as boschedule[];
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
this.boscheduleForm.markAsUntouched();
this.boscheduleForm.markAsPristine();
}



resetForm() {
if (this.boscheduleForm != null)
this.boscheduleForm.reset();
this.boscheduleForm.patchValue({
});
setTimeout(() => {
this.boscheduleservice.boscheduleruns=[];
this.boschedulerunsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.boscheduleForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let scheduleid = this.boscheduleForm.get('scheduleid').value;
        if(scheduleid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boscheduleservice.deleteboschedule(scheduleid).then(res =>
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
    this.boscheduleForm.patchValue({
        scheduleid: null
    });
    if(this.boscheduleservice.formData.scheduleid!=null)this.boscheduleservice.formData.scheduleid=null;
for (let i=0;i<this.boscheduleservice.boscheduleruns.length;i++) {
this.boscheduleservice.boscheduleruns[i].schedulerunid=null;
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
        else if(key=="lastrundate")
this.boscheduleForm.patchValue({"lastrundate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.boscheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boscheduleForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boscheduleForm.controls[key]!=undefined)this.boscheduleForm.controls[key].disable({onlySelf: true});
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
frequencyonChange(evt:any){
let e=this.f.frequency.value as any;
this.boscheduleForm.patchValue({frequencydesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){
this.boscheduleservice.getboschedulesByEID(pkcol).then(res => {

this.boscheduleservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boschedule.scheduleid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boschedule.scheduleid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boscheduleForm.patchValue({
scheduleid: res.boschedule.scheduleid,
sourcefield: res.boschedule.sourcefield,
sourcereference: res.boschedule.sourcereference,
procedurename: res.boschedule.procedurename,
frequency: res.boschedule.frequency,
frequencydesc: res.boschedule.frequencydesc,
notifiers: res.boschedule.notifiers,
lastrundate: this.ngbDateParserFormatter.parse(res.boschedule.lastrundate),
successrate: res.boschedule.successrate,
failurerate: res.boschedule.failurerate,
status: res.boschedule.status,
statusdesc: res.boschedule.statusdesc,
});
this.boschedulerunsvisiblelist=res.boschedulerunsvisiblelist;
//Child Tables if any
this.boscheduleservice.boscheduleruns = res.boscheduleruns;
this.SetboschedulerunsTableConfig();
this.boschedulerunsLoadTable();
  setTimeout(() => {
  this.SetboschedulerunsTableddConfig();
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
  for (let key in this.boscheduleForm.controls) {
    if (this.boscheduleForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boscheduleForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boscheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.boscheduleForm.value;
obj.lastrundate=new Date(this.boscheduleForm.get('lastrundate').value ? this.ngbDateParserFormatter.format(this.boscheduleForm.get('lastrundate').value)+'  UTC' :null);
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
Object.keys(this.boscheduleForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boscheduleForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boscheduleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boscheduleservice.formData=this.boscheduleForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boscheduleForm.controls[key] != null)
    {
        this.boscheduleservice.formData[key] = this.boscheduleForm.controls[key].value;
    }
}
}
}
this.boscheduleservice.formData.lastrundate=new Date(this.boscheduleForm.get('lastrundate').value ? this.ngbDateParserFormatter.format(this.boscheduleForm.get('lastrundate').value)+'  UTC' :null);
this.boscheduleservice.formData.DeletedboschedulerunIDs = this.DeletedboschedulerunIDs;
console.log(this.boscheduleservice.formData);
this.boscheduleservice.formData=this.boscheduleForm.value;
this.boscheduleservice.saveOrUpdateboschedules().subscribe(
async res => {
if (this.boschedulerunssource.data)
{
    for (let i = 0; i < this.boschedulerunssource.data.length; i++)
    {
        if (this.boschedulerunssource.data[i].fileattachmentlist)await this.sharedService.upload(this.boschedulerunssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boschedule);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boscheduleservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boschedule);
}
else
{
this.FillData(res);
}
}
this.boscheduleForm.markAsUntouched();
this.boscheduleForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditboschedulerun(event:any,schedulerunid:any, scheduleid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boschedulerunComponent, 
{
data:  {  showview:this.showview,save:false,event,schedulerunid, scheduleid,visiblelist:this.boschedulerunsvisiblelist,  hidelist:this.boschedulerunshidelist,ScreenType:2  },
header: 'Schedule Runs'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boschedulerunssource.add(res);
this.boschedulerunssource.refresh();
}
else
{
this.boschedulerunssource.update(event.data, res);
}
}
});
}

onDeleteboschedulerun(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboschedulerunIDs += childID + ",";
this.boscheduleservice.boscheduleruns.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes boscheduleruns
boschedulerunssettings:any;
boschedulerunssource: any;

showboschedulerunsCheckbox()
{
debugger;
if(this.tblboschedulerunssource.settings['selectMode']== 'multi')this.tblboschedulerunssource.settings['selectMode']= 'single';
else
this.tblboschedulerunssource.settings['selectMode']= 'multi';
this.tblboschedulerunssource.initGrid();
}
deleteboschedulerunsAll()
{
this.tblboschedulerunssource.settings['selectMode'] = 'single';
}
showboschedulerunsFilter()
{
  setTimeout(() => {
  this.SetboschedulerunsTableddConfig();
  });
      if(this.tblboschedulerunssource.settings!=null)this.tblboschedulerunssource.settings['hideSubHeader'] =!this.tblboschedulerunssource.settings['hideSubHeader'];
this.tblboschedulerunssource.initGrid();
}
showboschedulerunsInActive()
{
}
enableboschedulerunsInActive()
{
}
async SetboschedulerunsTableddConfig()
{
if(!this.bfilterPopulateboscheduleruns){
}
this.bfilterPopulateboscheduleruns=true;
}
async boschedulerunsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboschedulerunsTableConfig()
{
this.boschedulerunssettings = {
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
procedurename: {
title: 'Procedure Name',
type: '',
filter:true,
},
rundatetime: {
title: 'Run Date Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
runstatus: {
title: 'Run Status',
type: '',
filter:true,
},
runduration: {
title: 'Run Duration',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
notifiers: {
title: 'Notifiers',
type: '',
filter:true,
},
notifiedstatus: {
title: 'Notified Status',
type: '',
filter:true,
},
failurereason: {
title: 'Failure Reason',
type: '',
filter:true,
},
failuretext: {
title: 'Failure Text',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
boschedulerunsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boschedulerunsID)>=0)
{
this.boschedulerunssource=new LocalDataSource();
this.boschedulerunssource.load(this.boscheduleservice.boscheduleruns as  any as LocalDataSource);
this.boschedulerunssource.setPaging(1, 20, true);
}
}

//external to inline
/*
boschedulerunsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.boscheduleservice.boscheduleruns.length == 0)
{
    this.tblboschedulerunssource.grid.createFormShown = true;
}
else
{
    let obj = new boschedulerun();
    this.boscheduleservice.boscheduleruns.push(obj);
    this.boschedulerunssource.refresh();
    if ((this.boscheduleservice.boscheduleruns.length / this.boschedulerunssource.getPaging().perPage).toFixed(0) + 1 != this.boschedulerunssource.getPaging().page)
    {
        this.boschedulerunssource.setPage((this.boscheduleservice.boscheduleruns.length / this.boschedulerunssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboschedulerunssource.grid.edit(this.tblboschedulerunssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boschedulerunssource.data.indexOf(event.data);
this.onDeleteboschedulerun(event,event.data.schedulerunid,((this.boschedulerunssource.getPaging().page-1) *this.boschedulerunssource.getPaging().perPage)+index);
this.boschedulerunssource.refresh();
break;
}
}

*/
boschedulerunsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboschedulerun(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboschedulerun(event,event.data.schedulerunid,this.formid);
break;
case 'delete':
this.onDeleteboschedulerun(event,event.data.schedulerunid,((this.boschedulerunssource.getPaging().page-1) *this.boschedulerunssource.getPaging().perPage)+event.index);
this.boschedulerunssource.refresh();
break;
}
}
boschedulerunsonDelete(obj) {
let schedulerunid=obj.data.schedulerunid;
if (confirm('Are you sure to delete this record ?')) {
this.boscheduleservice.deleteboschedule(schedulerunid).then(res=>
this.boschedulerunsLoadTable()
);
}
}
boschedulerunsPaging(val)
{
debugger;
this.boschedulerunssource.setPaging(1, val, true);
}

handleboschedulerunsGridSelected(event:any) {
this.boschedulerunsselectedindex=this.boscheduleservice.boscheduleruns.findIndex(i => i.schedulerunid === event.data.schedulerunid);
}
IsboschedulerunsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boschedulerunsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boscheduleruns

}



