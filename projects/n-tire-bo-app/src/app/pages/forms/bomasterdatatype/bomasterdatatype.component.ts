import { bomasterdatatypeService } from './../../../service/bomasterdatatype.service';
import { bomasterdatatype } from './../../../model/bomasterdatatype.model';
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
import { bomasterdata } from './../../../model/bomasterdata.model';
//FK services
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
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
selector: 'app-bomasterdatatype',
templateUrl: './bomasterdatatype.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bomasterdatatypeComponent implements OnInit {
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
bfilterPopulatebomasterdatatypes:boolean=false;
databomasterdatatypescode3:any=[];
databomasterdatasmasterdatatypeid3:any=[];
bfilterPopulatebomasterdatas:boolean=false;
@ViewChild('tblbomasterdatassource',{static:false}) tblbomasterdatassource: Ng2SmartTableComponent;
 bomasterdatatypeForm: FormGroup;
codeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bomasterdatasvisiblelist:any;
bomasterdatashidelist:any;

DeletedbomasterdataIDs: string="";
bomasterdatasID: string = "1";
bomasterdatasselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bomasterdatatypeservice: bomasterdatatypeService,
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
this.bomasterdatatypeForm  = this.fb.group({pk:[null],datatypeid: [null],
code: [null],
codedesc: [null],
masterdataname: [null, Validators.required],
hassubcategory: [null],
canadd: [null],
canedit: [null],
candelete: [null],
erp: [null],
cams: [null],
crm: [null],
procurement: [null],
legal: [null],
hrms: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bomasterdatatypeForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bomasterdatatypeForm.dirty && this.bomasterdatatypeForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.datatypeid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.datatypeid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.datatypeid && pkDetail) {
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
let bomasterdatatypeid = null;

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
this.formid=bomasterdatatypeid;
//this.sharedService.alert(bomasterdatatypeid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbomasterdatasTableConfig();
  setTimeout(() => {
  this.SetbomasterdatasTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("code").then(res => this.codeList = res as boconfigvalue[]);

//autocomplete
    this.bomasterdatatypeservice.getbomasterdatatypesList().then(res => {
      this.pkList = res as bomasterdatatype[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.masterdataname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.masterdataname;

//setting the flag that the screen is not touched 
this.bomasterdatatypeForm.markAsUntouched();
this.bomasterdatatypeForm.markAsPristine();
}



resetForm() {
if (this.bomasterdatatypeForm != null)
this.bomasterdatatypeForm.reset();
this.bomasterdatatypeForm.patchValue({
});
setTimeout(() => {
this.bomasterdatatypeservice.bomasterdatas=[];
this.bomasterdatasLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let datatypeid = this.bomasterdatatypeForm.get('datatypeid').value;
        if(datatypeid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bomasterdatatypeservice.deletebomasterdatatype(datatypeid).then(res =>
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
    this.bomasterdatatypeForm.patchValue({
        datatypeid: null
    });
    if(this.bomasterdatatypeservice.formData.datatypeid!=null)this.bomasterdatatypeservice.formData.datatypeid=null;
for (let i=0;i<this.bomasterdatatypeservice.bomasterdatas.length;i++) {
this.bomasterdatatypeservice.bomasterdatas[i].masterdataid=null;
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
this.bomasterdatatypeForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bomasterdatatypeForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bomasterdatatypeForm.controls[key]!=undefined)this.bomasterdatatypeForm.controls[key].disable({onlySelf: true});
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
codeonChange(evt:any){
let e=this.f.code.value as any;
this.bomasterdatatypeForm.patchValue({codedesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){
this.bomasterdatatypeservice.getbomasterdatatypesByEID(pkcol).then(res => {

this.bomasterdatatypeservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bomasterdatatype.datatypeid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bomasterdatatype.datatypeid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bomasterdatatypeForm.patchValue({
datatypeid: res.bomasterdatatype.datatypeid,
code: res.bomasterdatatype.code,
codedesc: res.bomasterdatatype.codedesc,
masterdataname: res.bomasterdatatype.masterdataname,
hassubcategory: res.bomasterdatatype.hassubcategory,
canadd: res.bomasterdatatype.canadd,
canedit: res.bomasterdatatype.canedit,
candelete: res.bomasterdatatype.candelete,
erp: res.bomasterdatatype.erp,
cams: res.bomasterdatatype.cams,
crm: res.bomasterdatatype.crm,
procurement: res.bomasterdatatype.procurement,
legal: res.bomasterdatatype.legal,
hrms: res.bomasterdatatype.hrms,
status: res.bomasterdatatype.status,
statusdesc: res.bomasterdatatype.statusdesc,
});
this.bomasterdatasvisiblelist=res.bomasterdatasvisiblelist;
//Child Tables if any
this.bomasterdatatypeservice.bomasterdatas = res.bomasterdatas;
this.SetbomasterdatasTableConfig();
this.bomasterdatasLoadTable();
  setTimeout(() => {
  this.SetbomasterdatasTableddConfig();
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
  for (let key in this.bomasterdatatypeForm.controls) {
    if (this.bomasterdatatypeForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bomasterdatatypeForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bomasterdatatypeForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bomasterdatatypeForm.value;
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
Object.keys(this.bomasterdatatypeForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bomasterdatatypeForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bomasterdatatypeForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bomasterdatatypeservice.formData=this.bomasterdatatypeForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bomasterdatatypeForm.controls[key] != null)
    {
        this.bomasterdatatypeservice.formData[key] = this.bomasterdatatypeForm.controls[key].value;
    }
}
}
}
this.bomasterdatatypeservice.formData.DeletedbomasterdataIDs = this.DeletedbomasterdataIDs;
console.log(this.bomasterdatatypeservice.formData);
this.bomasterdatatypeservice.formData=this.bomasterdatatypeForm.value;
this.bomasterdatatypeservice.saveOrUpdatebomasterdatatypes().subscribe(
async res => {
if (this.bomasterdatassource.data)
{
    for (let i = 0; i < this.bomasterdatassource.data.length; i++)
    {
        if (this.bomasterdatassource.data[i].fileattachmentlist)await this.sharedService.upload(this.bomasterdatassource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bomasterdatatype);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bomasterdatatypeservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bomasterdatatype);
}
else
{
this.FillData(res);
}
}
this.bomasterdatatypeForm.markAsUntouched();
this.bomasterdatatypeForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbomasterdata(event:any,masterdataid:any, datatypeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bomasterdataComponent, 
{
data:  {  showview:this.showview,save:false,event,masterdataid, datatypeid,visiblelist:this.bomasterdatasvisiblelist,  hidelist:this.bomasterdatashidelist,ScreenType:2  },
header: 'MasterData'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bomasterdatassource.add(res);
this.bomasterdatassource.refresh();
}
else
{
this.bomasterdatassource.update(event.data, res);
}
}
});
}

onDeletebomasterdata(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbomasterdataIDs += childID + ",";
this.bomasterdatatypeservice.bomasterdatas.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bomasterdatas
bomasterdatassettings:any;
bomasterdatassource: any;

showbomasterdatasCheckbox()
{
debugger;
if(this.tblbomasterdatassource.settings['selectMode']== 'multi')this.tblbomasterdatassource.settings['selectMode']= 'single';
else
this.tblbomasterdatassource.settings['selectMode']= 'multi';
this.tblbomasterdatassource.initGrid();
}
deletebomasterdatasAll()
{
this.tblbomasterdatassource.settings['selectMode'] = 'single';
}
showbomasterdatasFilter()
{
  setTimeout(() => {
  this.SetbomasterdatasTableddConfig();
  });
      if(this.tblbomasterdatassource.settings!=null)this.tblbomasterdatassource.settings['hideSubHeader'] =!this.tblbomasterdatassource.settings['hideSubHeader'];
this.tblbomasterdatassource.initGrid();
}
showbomasterdatasInActive()
{
}
enablebomasterdatasInActive()
{
}
async SetbomasterdatasTableddConfig()
{
if(!this.bfilterPopulatebomasterdatas){

this.bomasterdatatypeservice.getbomasterdatatypesList().then(res=>
{
var datamasterdatatypeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databomasterdatasmasterdatatypeid3.push(defaultobj);
for(let i=0; i<datamasterdatatypeid2.length; i++){
var obj= { value: datamasterdatatypeid2[i].datatypeid, title:datamasterdatatypeid2[i].masterdataname};
this.databomasterdatasmasterdatatypeid3.push(obj);
}
if((this.tblbomasterdatassource.settings as any).columns['masterdatatypeid'])
{
(this.tblbomasterdatassource.settings as any).columns['masterdatatypeid'].editor.config.list=JSON.parse(JSON.stringify(this.databomasterdatasmasterdatatypeid3));
this.tblbomasterdatassource.initGrid();
}
});
}
this.bfilterPopulatebomasterdatas=true;
}
async bomasterdatasbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbomasterdatasTableConfig()
{
this.bomasterdatassettings = {
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
masterdatacode: {
title: 'Master Data Code',
type: '',
filter:true,
},
masterdatadescription: {
title: 'Master Data Description',
type: '',
filter:true,
},
orderno: {
title: 'Order No',
type: 'number',
filter:true,
},
htmlcode: {
title: 'H T M L Code',
type: '',
filter:true,
},
param1: {
title: 'Param1',
type: '',
filter:true,
},
param2: {
title: 'Param2',
type: '',
filter:true,
},
helptext: {
title: 'Help Text',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
flag: {
title: 'Flag',
type: '',
filter:true,
},
},
};
}
bomasterdatasLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bomasterdatasID)>=0)
{
this.bomasterdatassource=new LocalDataSource();
this.bomasterdatassource.load(this.bomasterdatatypeservice.bomasterdatas as  any as LocalDataSource);
this.bomasterdatassource.setPaging(1, 20, true);
}
}

//external to inline
/*
bomasterdatasroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bomasterdatatypeservice.bomasterdatas.length == 0)
{
    this.tblbomasterdatassource.grid.createFormShown = true;
}
else
{
    let obj = new bomasterdata();
    this.bomasterdatatypeservice.bomasterdatas.push(obj);
    this.bomasterdatassource.refresh();
    if ((this.bomasterdatatypeservice.bomasterdatas.length / this.bomasterdatassource.getPaging().perPage).toFixed(0) + 1 != this.bomasterdatassource.getPaging().page)
    {
        this.bomasterdatassource.setPage((this.bomasterdatatypeservice.bomasterdatas.length / this.bomasterdatassource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbomasterdatassource.grid.edit(this.tblbomasterdatassource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.bomasterdatassource.data.indexOf(event.data);
this.onDeletebomasterdata(event,event.data.masterdataid,((this.bomasterdatassource.getPaging().page-1) *this.bomasterdatassource.getPaging().perPage)+index);
this.bomasterdatassource.refresh();
}
break;
}
}

*/
bomasterdatasroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbomasterdata(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbomasterdata(event,event.data.masterdataid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeletebomasterdata(event,event.data.masterdataid,((this.bomasterdatassource.getPaging().page-1) *this.bomasterdatassource.getPaging().perPage)+event.index);
this.bomasterdatassource.refresh();
}
break;
}
}
bomasterdatasonDelete(obj) {
let masterdataid=obj.data.masterdataid;
if (confirm('Are you sure to delete this record ?')) {
this.bomasterdatatypeservice.deletebomasterdatatype(masterdataid).then(res=>
this.bomasterdatasLoadTable()
);
}
}
bomasterdatasPaging(val)
{
debugger;
this.bomasterdatassource.setPaging(1, val, true);
}

handlebomasterdatasGridSelected(event:any) {
this.bomasterdatasselectedindex=this.bomasterdatatypeservice.bomasterdatas.findIndex(i => i.masterdataid === event.data.masterdataid);
}
IsbomasterdatasVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bomasterdatasID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bomasterdatas

}



