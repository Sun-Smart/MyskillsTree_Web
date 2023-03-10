import { bomasterdataService } from './../../../service/bomasterdata.service';
import { bomasterdata } from './../../../model/bomasterdata.model';
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
import { bomasterdatatype} from './../../../model/bomasterdatatype.model';
import { bomasterdatatypeService } from './../../../service/bomasterdatatype.service';
//popups
//detail table services
import { bosubcategorymaster } from './../../../model/bosubcategorymaster.model';
//FK services
import { bosubcategorymasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.component';
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
selector: 'app-bomasterdata',
templateUrl: './bomasterdata.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bomasterdataComponent implements OnInit {
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
bfilterPopulatebomasterdatas:boolean=false;
databomasterdatasmasterdatatypeid3:any=[];
bfilterPopulatebosubcategorymasters:boolean=false;
@ViewChild('tblbosubcategorymasterssource',{static:false}) tblbosubcategorymasterssource: Ng2SmartTableComponent;
 bomasterdataForm: FormGroup;
masterdatatypeidList: bomasterdatatype[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bosubcategorymastersvisiblelist:any;
bosubcategorymastershidelist:any;

DeletedbosubcategorymasterIDs: string="";
bosubcategorymastersID: string = "1";
bosubcategorymastersselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bomasterdataservice: bomasterdataService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdatatypeservice:bomasterdatatypeService,
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
this.bomasterdataForm  = this.fb.group({pk:[null],masterdataid: [null],
masterdatatypeid: [null],
masterdatatypeiddesc: [null],
masterdatacode: [null],
masterdatadescription: [null],
orderno: [null],
htmlcode: [null],
param1: [null],
param2: [null],
helptext: [null],
flag: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bomasterdataForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bomasterdataForm.dirty && this.bomasterdataForm.touched ) {
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
????if(this.pkList.length>0)??this.PopulateScreen(this.pkList[0].pkcol);
}

last()
{
??if(this.pkList.length>0)??this.PopulateScreen(this.pkList[this.pkList.length-1].pkcol);
}

prev()
{
????debugger;
????let??pos??=??this.pkList.map(function(e:any)??{??return e.masterdataid.toString();??}).indexOf(this.formid.toString());
????if(pos>0)??this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
????debugger;
let??pos??=??this.pkList.map(function(e:any)??{??return??e.masterdataid.toString();??}).indexOf(this.formid.toString());
????if(pos>=0??&&??pos!=this.pkList.length)??this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.masterdataid && pkDetail) {
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
let bomasterdataid = null;

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
this.formid=bomasterdataid;
//this.sharedService.alert(bomasterdataid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbosubcategorymastersTableConfig();
  setTimeout(() => {
  this.SetbosubcategorymastersTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bomasterdatatypeservice.getbomasterdatatypesList().then(res => 
{
this.masterdatatypeidList = res as bomasterdatatype[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.bomasterdataservice.getbomasterdatasList().then(res => {
      this.pkList = res as bomasterdata[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.masterdatadescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.masterdatadescription;

//setting the flag that the screen is not touched 
this.bomasterdataForm.markAsUntouched();
this.bomasterdataForm.markAsPristine();
}



resetForm() {
if (this.bomasterdataForm != null)
this.bomasterdataForm.reset();
this.bomasterdataForm.patchValue({
});
setTimeout(() => {
this.bomasterdataservice.bosubcategorymasters=[];
this.bosubcategorymastersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let masterdataid = this.bomasterdataForm.get('masterdataid').value;
        if(masterdataid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bomasterdataservice.deletebomasterdata(masterdataid).then(res =>
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
    this.bomasterdataForm.patchValue({
        masterdataid: null
    });
    if(this.bomasterdataservice.formData.masterdataid!=null)this.bomasterdataservice.formData.masterdataid=null;
for (let i=0;i<this.bomasterdataservice.bosubcategorymasters.length;i++) {
this.bomasterdataservice.bosubcategorymasters[i].subcategoryid=null;
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
this.bomasterdataForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bomasterdataForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bomasterdataForm.controls[key]!=undefined)this.bomasterdataForm.controls[key].disable({onlySelf: true});
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
masterdataidonChange(evt:any){
let e=evt.value;
}
masterdatatypeidonChange(evt:any){
let e=evt.value;
this.bomasterdataForm.patchValue({masterdatatypeiddesc:evt.options[evt.options.selectedIndex].text});
}
masterdatacodeonChange(evt:any){
let e=evt.value;
}
masterdatadescriptiononChange(evt:any){
let e=evt.value;
}
ordernoonChange(evt:any){
let e=evt.value;
}
htmlcodeonChange(evt:any){
let e=evt.value;
}
param1onChange(evt:any){
let e=evt.value;
}
param2onChange(evt:any){
let e=evt.value;
}
helptextonChange(evt:any){
let e=evt.value;
}
flagonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.bomasterdataservice.getbomasterdatasByEID(pkcol).then(res => {

this.bomasterdataservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bomasterdata.masterdataid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bomasterdata.masterdataid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bomasterdataForm.patchValue({
masterdataid: res.bomasterdata.masterdataid,
masterdatatypeid: res.bomasterdata.masterdatatypeid,
masterdatatypeiddesc: res.bomasterdata.masterdatatypeiddesc,
masterdatacode: res.bomasterdata.masterdatacode,
masterdatadescription: res.bomasterdata.masterdatadescription,
orderno: res.bomasterdata.orderno,
htmlcode: res.bomasterdata.htmlcode,
param1: res.bomasterdata.param1,
param2: res.bomasterdata.param2,
helptext: res.bomasterdata.helptext,
flag: res.bomasterdata.flag,
status: res.bomasterdata.status,
statusdesc: res.bomasterdata.statusdesc,
});
this.bosubcategorymastersvisiblelist=res.bosubcategorymastersvisiblelist;
//Child Tables if any
this.bomasterdataservice.bosubcategorymasters = res.bosubcategorymasters;
this.SetbosubcategorymastersTableConfig();
this.bosubcategorymastersLoadTable();
  setTimeout(() => {
  this.SetbosubcategorymastersTableddConfig();
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
  for (let key in this.bomasterdataForm.controls) {
    if (this.bomasterdataForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bomasterdataForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bomasterdataForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bomasterdataForm.value;
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
Object.keys(this.bomasterdataForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bomasterdataForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bomasterdataForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bomasterdataservice.formData=this.bomasterdataForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bomasterdataForm.controls[key] != null)
    {
        this.bomasterdataservice.formData[key] = this.bomasterdataForm.controls[key].value;
    }
}
}
}
this.bomasterdataservice.formData.DeletedbosubcategorymasterIDs = this.DeletedbosubcategorymasterIDs;
console.log(this.bomasterdataservice.formData);
this.bomasterdataservice.formData=this.bomasterdataForm.value;
this.bomasterdataservice.saveOrUpdatebomasterdatas().subscribe(
async res => {
if (this.bosubcategorymasterssource.data)
{
    for (let i = 0; i < this.bosubcategorymasterssource.data.length; i++)
    {
        if (this.bosubcategorymasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bosubcategorymasterssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bomasterdata);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bomasterdataservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bomasterdata);
}
else
{
this.FillData(res);
}
}
this.bomasterdataForm.markAsUntouched();
this.bomasterdataForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditmasterdatatypeid( datatypeid) {
/*let ScreenType='2';
this.dialog.open(bomasterdatatypeComponent, 
{
data: {datatypeid:this.bomasterdataForm.get('masterdatatypeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbosubcategorymaster(event:any,subcategoryid:any, masterdataid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bosubcategorymasterComponent, 
{
data:  {  showview:this.showview,save:false,event,subcategoryid, masterdataid,visiblelist:this.bosubcategorymastersvisiblelist,  hidelist:this.bosubcategorymastershidelist,ScreenType:2  },
header: 'SubCategory Masters'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bosubcategorymasterssource.add(res);
this.bosubcategorymasterssource.refresh();
}
else
{
this.bosubcategorymasterssource.update(event.data, res);
}
}
});
}

onDeletebosubcategorymaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbosubcategorymasterIDs += childID + ",";
this.bomasterdataservice.bosubcategorymasters.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bosubcategorymasters
bosubcategorymasterssettings:any;
bosubcategorymasterssource: any;

showbosubcategorymastersCheckbox()
{
debugger;
if(this.tblbosubcategorymasterssource.settings['selectMode']== 'multi')this.tblbosubcategorymasterssource.settings['selectMode']= 'single';
else
this.tblbosubcategorymasterssource.settings['selectMode']= 'multi';
this.tblbosubcategorymasterssource.initGrid();
}
deletebosubcategorymastersAll()
{
this.tblbosubcategorymasterssource.settings['selectMode'] = 'single';
}
showbosubcategorymastersFilter()
{
  setTimeout(() => {
  this.SetbosubcategorymastersTableddConfig();
  });
      if(this.tblbosubcategorymasterssource.settings!=null)this.tblbosubcategorymasterssource.settings['hideSubHeader'] =!this.tblbosubcategorymasterssource.settings['hideSubHeader'];
this.tblbosubcategorymasterssource.initGrid();
}
showbosubcategorymastersInActive()
{
}
enablebosubcategorymastersInActive()
{
}
async SetbosubcategorymastersTableddConfig()
{
if(!this.bfilterPopulatebosubcategorymasters){
}
this.bfilterPopulatebosubcategorymasters=true;
}
async bosubcategorymastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbosubcategorymastersTableConfig()
{
this.bosubcategorymasterssettings = {
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
subcategoryname: {
title: 'Sub Category Name',
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
bosubcategorymastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bosubcategorymastersID)>=0)
{
this.bosubcategorymasterssource=new LocalDataSource();
this.bosubcategorymasterssource.load(this.bomasterdataservice.bosubcategorymasters as  any as LocalDataSource);
this.bosubcategorymasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bosubcategorymastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bomasterdataservice.bosubcategorymasters.length == 0)
{
    this.tblbosubcategorymasterssource.grid.createFormShown = true;
}
else
{
    let obj = new bosubcategorymaster();
    this.bomasterdataservice.bosubcategorymasters.push(obj);
    this.bosubcategorymasterssource.refresh();
    if ((this.bomasterdataservice.bosubcategorymasters.length / this.bosubcategorymasterssource.getPaging().perPage).toFixed(0) + 1 != this.bosubcategorymasterssource.getPaging().page)
    {
        this.bosubcategorymasterssource.setPage((this.bomasterdataservice.bosubcategorymasters.length / this.bosubcategorymasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbosubcategorymasterssource.grid.edit(this.tblbosubcategorymasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bosubcategorymasterssource.data.indexOf(event.data);
this.onDeletebosubcategorymaster(event,event.data.subcategoryid,((this.bosubcategorymasterssource.getPaging().page-1) *this.bosubcategorymasterssource.getPaging().perPage)+index);
this.bosubcategorymasterssource.refresh();
break;
}
}

*/
bosubcategorymastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbosubcategorymaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbosubcategorymaster(event,event.data.subcategoryid,this.formid);
break;
case 'delete':
this.onDeletebosubcategorymaster(event,event.data.subcategoryid,((this.bosubcategorymasterssource.getPaging().page-1) *this.bosubcategorymasterssource.getPaging().perPage)+event.index);
this.bosubcategorymasterssource.refresh();
break;
}
}
bosubcategorymastersonDelete(obj) {
let subcategoryid=obj.data.subcategoryid;
if (confirm('Are you sure to delete this record ?')) {
this.bomasterdataservice.deletebomasterdata(subcategoryid).then(res=>
this.bosubcategorymastersLoadTable()
);
}
}
bosubcategorymastersPaging(val)
{
debugger;
this.bosubcategorymasterssource.setPaging(1, val, true);
}

handlebosubcategorymastersGridSelected(event:any) {
this.bosubcategorymastersselectedindex=this.bomasterdataservice.bosubcategorymasters.findIndex(i => i.subcategoryid === event.data.subcategoryid);
}
IsbosubcategorymastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bosubcategorymastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bosubcategorymasters

}



