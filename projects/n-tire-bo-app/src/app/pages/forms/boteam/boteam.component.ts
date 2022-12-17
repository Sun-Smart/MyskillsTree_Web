import { boteamService } from './../../../service/boteam.service';
import { boteam } from './../../../model/boteam.model';
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
import { bousermaster} from './../../../model/bousermaster.model';
import { bousermasterService } from './../../../service/bousermaster.service';
//popups
//detail table services
import { boteammember } from './../../../model/boteammember.model';
//FK services
import { boteammemberComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boteammember/boteammember.component';
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
selector: 'app-boteam',
templateUrl: './boteam.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boteamComponent implements OnInit {
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
bfilterPopulateboteams:boolean=false;
databoteamsmanagerid3:any=[];
bfilterPopulateboteammembers:boolean=false;
@ViewChild('tblboteammemberssource',{static:false}) tblboteammemberssource: Ng2SmartTableComponent;
 boteamForm: FormGroup;
manageridList: bousermaster[];
manageridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
managerid_bousermastersForm: FormGroup;//autocomplete
managerid_bousermastersoptions:any;//autocomplete
managerid_bousermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



boteammembersvisiblelist:any;
boteammembershidelist:any;

DeletedboteammemberIDs: string="";
boteammembersID: string = "1";
boteammembersselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private boteamservice: boteamService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
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
this.boteamForm  = this.fb.group({pk:[null],teamid: [null],
managerid: [null],
manageriddesc: [null],
description: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.boteamForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boteamForm.dirty && this.boteamForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.teamid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.teamid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.teamid && pkDetail) {
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
let boteamid = null;

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
this.formid=boteamid;
//this.sharedService.alert(boteamid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetboteammembersTableConfig();
  setTimeout(() => {
  this.SetboteammembersTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.manageridList = res as bousermaster[];
if(this.boteamservice.formData && this.boteamservice.formData.managerid){
this.manageridoptionsEvent.emit(this.manageridList);
this.boteamForm.patchValue({
    managerid: this.boteamservice.formData.managerid,
    manageriddesc: this.boteamservice.formData.manageriddesc,
});
}
{
let arrmanagerid = this.manageridList.filter(v => v.userid == this.boteamForm.get('managerid').value);
let objmanagerid;
if (arrmanagerid.length > 0) objmanagerid = arrmanagerid[0];
if (objmanagerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.managerid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.manageridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.managerid_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.boteamservice.getboteamsList().then(res => {
      this.pkList = res as boteam[];
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
this.boteamForm.markAsUntouched();
this.boteamForm.markAsPristine();
}
onSelectedmanagerid(manageridDetail: any) {
if (manageridDetail.managerid && manageridDetail) {
this.boteamForm.patchValue({
managerid: manageridDetail.managerid,
manageriddesc: manageridDetail.username,

});

}
}




resetForm() {
if (this.boteamForm != null)
this.boteamForm.reset();
this.boteamForm.patchValue({
managerid: this.sessiondata.userid,
manageriddesc: this.sessiondata.username,
});
setTimeout(() => {
this.boteamservice.boteammembers=[];
this.boteammembersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let teamid = this.boteamForm.get('teamid').value;
        if(teamid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boteamservice.deleteboteam(teamid).then(res =>
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
    this.boteamForm.patchValue({
        teamid: null
    });
    if(this.boteamservice.formData.teamid!=null)this.boteamservice.formData.teamid=null;
for (let i=0;i<this.boteamservice.boteammembers.length;i++) {
this.boteamservice.boteammembers[i].teammemberid=null;
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
        else if(key=="remarks")
this.boteamForm.patchValue({"remarks":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.boteamForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boteamForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boteamForm.controls[key]!=undefined)this.boteamForm.controls[key].disable({onlySelf: true});
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
teamidonChange(evt:any){
let e=evt.value;
}
manageridonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.boteamservice.getboteamsByEID(pkcol).then(res => {

this.boteamservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boteam.teamid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boteam.teamid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boteamForm.patchValue({
teamid: res.boteam.teamid,
managerid: res.boteam.managerid,
manageriddesc: res.boteam.manageriddesc,
description: res.boteam.description,
remarks: JSON.parse(res.boteam.remarks),
status: res.boteam.status,
statusdesc: res.boteam.statusdesc,
});
this.boteammembersvisiblelist=res.boteammembersvisiblelist;
//Child Tables if any
this.boteamservice.boteammembers = res.boteammembers;
this.SetboteammembersTableConfig();
this.boteammembersLoadTable();
  setTimeout(() => {
  this.SetboteammembersTableddConfig();
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
  for (let key in this.boteamForm.controls) {
    if (this.boteamForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boteamForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boteamForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.boteamForm.value;
obj.remarks=JSON.stringify(this.boteamForm.get('remarks').value);
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
Object.keys(this.boteamForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boteamForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boteamForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boteamservice.formData=this.boteamForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boteamForm.controls[key] != null)
    {
        this.boteamservice.formData[key] = this.boteamForm.controls[key].value;
    }
}
}
}
this.boteamservice.formData.remarks=JSON.stringify(this.boteamForm.get('remarks').value);
this.boteamservice.formData.DeletedboteammemberIDs = this.DeletedboteammemberIDs;
console.log(this.boteamservice.formData);
this.boteamservice.formData=this.boteamForm.value;
this.boteamservice.saveOrUpdateboteams().subscribe(
async res => {
if (this.boteammemberssource.data)
{
    for (let i = 0; i < this.boteammemberssource.data.length; i++)
    {
        if (this.boteammemberssource.data[i].fileattachmentlist)await this.sharedService.upload(this.boteammemberssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boteam);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boteamservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boteam);
}
else
{
this.FillData(res);
}
}
this.boteamForm.markAsUntouched();
this.boteamForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditmanagerid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.boteamForm.get('managerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditboteammember(event:any,teammemberid:any, teamid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boteammemberComponent, 
{
data:  {  showview:this.showview,save:false,event,teammemberid, teamid,visiblelist:this.boteammembersvisiblelist,  hidelist:this.boteammembershidelist,ScreenType:2  },
header: 'Team Members'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boteammemberssource.add(res);
this.boteammemberssource.refresh();
}
else
{
this.boteammemberssource.update(event.data, res);
}
}
});
}

onDeleteboteammember(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboteammemberIDs += childID + ",";
this.boteamservice.boteammembers.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes boteammembers
boteammemberssettings:any;
boteammemberssource: any;

showboteammembersCheckbox()
{
debugger;
if(this.tblboteammemberssource.settings['selectMode']== 'multi')this.tblboteammemberssource.settings['selectMode']= 'single';
else
this.tblboteammemberssource.settings['selectMode']= 'multi';
this.tblboteammemberssource.initGrid();
}
deleteboteammembersAll()
{
this.tblboteammemberssource.settings['selectMode'] = 'single';
}
showboteammembersFilter()
{
  setTimeout(() => {
  this.SetboteammembersTableddConfig();
  });
      if(this.tblboteammemberssource.settings!=null)this.tblboteammemberssource.settings['hideSubHeader'] =!this.tblboteammemberssource.settings['hideSubHeader'];
this.tblboteammemberssource.initGrid();
}
showboteammembersInActive()
{
}
enableboteammembersInActive()
{
}
async SetboteammembersTableddConfig()
{
if(!this.bfilterPopulateboteammembers){
}
this.bfilterPopulateboteammembers=true;
}
async boteammembersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboteammembersTableConfig()
{
this.boteammemberssettings = {
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
userid: {
title: 'User',
type: 'number',
filter:true,
},
startdate: {
title: 'Start Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
enddate: {
title: 'End Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
rateperhour: {
title: 'Rate Per Hour',
type: 'number',
filter:true,
},
memberstatus: {
title: 'Member Status',
type: '',
filter:true,
},
},
};
}
boteammembersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boteammembersID)>=0)
{
this.boteammemberssource=new LocalDataSource();
this.boteammemberssource.load(this.boteamservice.boteammembers as  any as LocalDataSource);
this.boteammemberssource.setPaging(1, 20, true);
}
}

//external to inline
/*
boteammembersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.boteamservice.boteammembers.length == 0)
{
    this.tblboteammemberssource.grid.createFormShown = true;
}
else
{
    let obj = new boteammember();
    this.boteamservice.boteammembers.push(obj);
    this.boteammemberssource.refresh();
    if ((this.boteamservice.boteammembers.length / this.boteammemberssource.getPaging().perPage).toFixed(0) + 1 != this.boteammemberssource.getPaging().page)
    {
        this.boteammemberssource.setPage((this.boteamservice.boteammembers.length / this.boteammemberssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboteammemberssource.grid.edit(this.tblboteammemberssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boteammemberssource.data.indexOf(event.data);
this.onDeleteboteammember(event,event.data.teammemberid,((this.boteammemberssource.getPaging().page-1) *this.boteammemberssource.getPaging().perPage)+index);
this.boteammemberssource.refresh();
break;
}
}

*/
boteammembersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboteammember(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboteammember(event,event.data.teammemberid,this.formid);
break;
case 'delete':
this.onDeleteboteammember(event,event.data.teammemberid,((this.boteammemberssource.getPaging().page-1) *this.boteammemberssource.getPaging().perPage)+event.index);
this.boteammemberssource.refresh();
break;
}
}
boteammembersonDelete(obj) {
let teammemberid=obj.data.teammemberid;
if (confirm('Are you sure to delete this record ?')) {
this.boteamservice.deleteboteam(teammemberid).then(res=>
this.boteammembersLoadTable()
);
}
}
boteammembersPaging(val)
{
debugger;
this.boteammemberssource.setPaging(1, val, true);
}

handleboteammembersGridSelected(event:any) {
this.boteammembersselectedindex=this.boteamservice.boteammembers.findIndex(i => i.teammemberid === event.data.teammemberid);
}
IsboteammembersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boteammembersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boteammembers

}



