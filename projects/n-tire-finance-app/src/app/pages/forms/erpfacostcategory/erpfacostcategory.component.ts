import { erpfacostcategoryService } from './../../../service/erpfacostcategory.service';
import { erpfacostcategory } from './../../../model/erpfacostcategory.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';

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
//detail table services
import { erpfacostcenter } from './../../../model/erpfacostcenter.model';
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
selector: 'app-erpfacostcategory',
templateUrl: './erpfacostcategory.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpfacostcategoryComponent implements OnInit {
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
data3:any=[];
bfilterPopulateerpfacostcategories:boolean=false;
dataerpfacostcentersmode3:any=[];
bfilterPopulateerpfacostcenters:boolean=false;
@ViewChild('tblerpfacostcenterssource',{static:false}) tblerpfacostcenterssource: Ng2SmartTableComponent;
 erpfacostcategoryForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



erpfacostcentersvisiblelist:any;
erpfacostcentershidelist:any;

DeletederpfacostcenterIDs: string="";
erpfacostcentersID: string = "1";
erpfacostcentersselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpfacostcategoryservice: erpfacostcategoryService,
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
this.erpfacostcategoryForm  = this.fb.group({pk:[null],ccid: [null],
cccode: [null],
ccname: [null],
budget: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpfacostcategoryForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpfacostcategoryForm.dirty && this.erpfacostcategoryForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
cccodeexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.cccode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].ccid.toString()!=this.formid.toString()) 
  {
    if(confirm("This C C Code value exists in the database.Do you want to display the record ? "))
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
  let pos = this.pkList.map(function(e:any) { return e.ccid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.ccid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.ccid && pkDetail) {
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
let erpfacostcategoryid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)this.data=this.data.data;
 if(this.data!=null && this.data.showview!=undefined  && this.data.showview!=null)this.showview=this.data.showview;
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
this.formid=erpfacostcategoryid;
//this.sharedService.alert(erpfacostcategoryid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpfacostcentersTableConfig();
  setTimeout(() => {
  this.SeterpfacostcentersTableddConfig();
  });

this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.erpfacostcategoryservice.geterpfacostcategoriesList().then(res => {
      this.pkList = res as erpfacostcategory[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.ccname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.ccname;

//setting the flag that the screen is not touched 
this.erpfacostcategoryForm.markAsUntouched();
this.erpfacostcategoryForm.markAsPristine();
}



resetForm() {
if (this.erpfacostcategoryForm != null)
this.erpfacostcategoryForm.reset();
this.erpfacostcategoryForm.patchValue({
});
setTimeout(() => {
this.erpfacostcategoryservice.erpfacostcenters=[];
this.erpfacostcentersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let ccid = this.erpfacostcategoryForm.get('ccid').value;
        if(ccid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpfacostcategoryservice.deleteerpfacostcategory(ccid).then(res =>
                {
                this.resetForm();
                }
            );
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.erpfacostcategoryForm.patchValue({
        ccid: null
    });
    if(this.erpfacostcategoryservice.formData.ccid!=null)this.erpfacostcategoryservice.formData.ccid=null;
for (let i=0;i<this.erpfacostcategoryservice.erpfacostcenters.length;i++) {
this.erpfacostcategoryservice.erpfacostcenters[i].costcenterid=null;
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
        jsonstring='{"'+key+'": "'+mainscreendata[key] +'" }';
        json=JSON.parse(jsonstring);
}
        else
{
        jsonstring='{"'+key+'": '+mainscreendata[key] +' }';  
        json=JSON.parse(jsonstring);
}
{
        if(this.erpfacostcategoryForm.controls[key]!=null)
{
this.erpfacostcategoryForm.patchValue(json);
         if(bdisable)this.erpfacostcategoryForm.controls[key].disable({onlySelf: true});
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
if(this.data.save==true)
{
    this.onSubmitData(false);
}
else if(this.data!=null  && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}

async PopulateScreen(pkcol:any){this.erpfacostcategoryservice.geterpfacostcategoriesByEID(pkcol).then(res => {

this.erpfacostcategoryservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.erpfacostcategory.ccid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.erpfacostcategory.ccid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpfacostcategoryForm.patchValue({
ccid: res.erpfacostcategory.ccid,
cccode: res.erpfacostcategory.cccode,
ccname: res.erpfacostcategory.ccname,
budget: res.erpfacostcategory.budget,
status: res.erpfacostcategory.status,
statusdesc: res.erpfacostcategory.statusdesc,
});
this.erpfacostcentersvisiblelist=res.erpfacostcentersvisiblelist;
//Child Tables if any
this.erpfacostcategoryservice.erpfacostcenters = res.erpfacostcenter;
this.SeterpfacostcentersTableConfig();
this.erpfacostcentersLoadTable();
  setTimeout(() => {
  this.SeterpfacostcentersTableddConfig();
  });
}

validate()
{
let ret=true;
let tot=0;
for(let i=0;i<this.erpfacostcategoryservice.erpfacostcenters.length;i++)
{
tot+=+this.erpfacostcategoryservice.erpfacostcenters[i].budget;
}
if(tot<this.erpfacostcategoryForm.get('budget').value)
{
this.toastr.addSingle("error", "", "total costcenter budget should be less than the cost category budget");
ret=false;
}
return ret;
}

getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.erpfacostcategoryForm.controls) {
    if (this.erpfacostcategoryForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpfacostcategoryForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpfacostcategoryForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpfacostcategoryForm.value;
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
this.dialogRef.close(obj);
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
Object.keys(this.erpfacostcategoryForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpfacostcategoryForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpfacostcategoryForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpfacostcategoryservice.formData=this.erpfacostcategoryForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpfacostcategoryForm.controls[key] != null)
    {
        this.erpfacostcategoryservice.formData[key] = this.erpfacostcategoryForm.controls[key].value;
    }
}
}
}
this.erpfacostcategoryservice.formData.DeletederpfacostcenterIDs = this.DeletederpfacostcenterIDs;
console.log(this.erpfacostcategoryservice.formData);
this.erpfacostcategoryservice.formData=this.erpfacostcategoryForm.value;
this.erpfacostcategoryservice.saveOrUpdateerpfacostcategories().subscribe(
async res => {
if (this.erpfacostcenterssource.data)
{
    for (let i = 0; i < this.erpfacostcenterssource.data.length; i++)
    {
        if (this.erpfacostcenterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpfacostcenterssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.erpfacostcategory);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpfacostcategoryservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.erpfacostcategory);
}
else
{
this.FillData(res);
}
}
this.erpfacostcategoryForm.markAsUntouched();
this.erpfacostcategoryForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

onDeleteerpfacostcenter(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpfacostcenterIDs += childID + ",";
this.erpfacostcategoryservice.erpfacostcenters.splice(i, 1);
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpfacostcenters
erpfacostcenterssettings:any;
erpfacostcenterssource: any;

showerpfacostcentersCheckbox()
{
debugger;
if(this.tblerpfacostcenterssource.settings['selectMode']== 'multi')this.tblerpfacostcenterssource.settings['selectMode']= 'single';
else
this.tblerpfacostcenterssource.settings['selectMode']= 'multi';
this.tblerpfacostcenterssource.initGrid();
}
deleteerpfacostcentersAll()
{
this.tblerpfacostcenterssource.settings['selectMode'] = 'single';
}
showerpfacostcentersFilter()
{
  setTimeout(() => {
  this.SeterpfacostcentersTableddConfig();
  });
      if(this.tblerpfacostcenterssource.settings!=null)this.tblerpfacostcenterssource.settings['hideSubHeader'] =!this.tblerpfacostcenterssource.settings['hideSubHeader'];
this.tblerpfacostcenterssource.initGrid();
}
showerpfacostcentersInActive()
{
}
enableerpfacostcentersInActive()
{
}
async SeterpfacostcentersTableddConfig()
{
if(!this.bfilterPopulateerpfacostcenters){

this.configservice.getList("costcentermode").then(res=>
{
var datamode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpfacostcentersmode3.push(defaultobj);
for(let i=0; i<datamode2.length; i++){
var obj= { value: datamode2[i].configkey, title: datamode2[i].configtext};
this.dataerpfacostcentersmode3.push(obj);
}
var clone = this.sharedService.clone(this.tblerpfacostcenterssource.settings);
if(clone.columns['mode']!=undefined)clone.columns['mode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpfacostcentersmode3)), }, };
if(clone.columns['mode']!=undefined)clone.columns['mode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpfacostcentersmode3)), }, };
this.tblerpfacostcenterssource.settings =  clone;
this.tblerpfacostcenterssource.initGrid();
});
}
this.bfilterPopulateerpfacostcenters=true;
}
async erpfacostcentersbeforesave(event:any){
debugger;
console.log(event.newData);
for(let i=0;i<this.erpfacostcategoryservice.erpfacostcenters.length;i++)
{
if(this.erpfacostcategoryservice.erpfacostcenters[i].costcentercode==event.newData.costcentercode && (event.newData.costcenterid==null || this.erpfacostcategoryservice.erpfacostcenters[i].costcenterid!=event.newData.costcenterid) )
{
this.toastr.addSingle("error", "", "CostCenter Code are unique");
return false;
}
}
event.confirm.resolve(event.newData);
}
SeterpfacostcentersTableConfig()
{
this.erpfacostcenterssettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
add: !this.showview,
edit: !this.showview, // true,
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
mode: {
title: 'Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpfacostcentersmode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
query: {
title: 'Query',
type: '',
filter:true,
},
costcentercode: {
title: 'Cost Center Code',
type: '',
filter:true,
},
costcentername: {
title: 'Cost Center Name',
type: '',
filter:true,
},
budget: {
title: 'Budget',
type: 'number',
filter:true,
},
},
};
}
erpfacostcentersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpfacostcentersID)>=0)
{
this.erpfacostcenterssource=new LocalDataSource();
this.erpfacostcenterssource.load(this.erpfacostcategoryservice.erpfacostcenters as  any as LocalDataSource);
this.erpfacostcenterssource.setPaging(1, 20, true);
}
}
erpfacostcentersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpfacostcategoryservice.erpfacostcenters.length == 0)
{
    this.tblerpfacostcenterssource.grid.createFormShown = true;
}
else
{
    let obj = new erpfacostcenter();
    this.erpfacostcategoryservice.erpfacostcenters.push(obj);
    this.erpfacostcenterssource.refresh();
    if ((this.erpfacostcategoryservice.erpfacostcenters.length / this.erpfacostcenterssource.getPaging().perPage).toFixed(0) + 1 != this.erpfacostcenterssource.getPaging().page)
    {
        this.erpfacostcenterssource.setPage((this.erpfacostcategoryservice.erpfacostcenters.length / this.erpfacostcenterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpfacostcenterssource.grid.edit(this.tblerpfacostcenterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpfacostcenterssource.data.indexOf(event.data);
this.onDeleteerpfacostcenter(event,event.data.costcenterid,((this.erpfacostcenterssource.getPaging().page-1) *this.erpfacostcenterssource.getPaging().perPage)+index);
this.erpfacostcenterssource.refresh();
break;
}
}
erpfacostcentersPaging(val)
{
debugger;
this.erpfacostcenterssource.setPaging(1, val, true);
}

handleerpfacostcentersGridSelected(event:any) {
this.erpfacostcentersselectedindex=this.erpfacostcategoryservice.erpfacostcenters.findIndex(i => i.costcenterid === event.data.costcenterid);
}
IserpfacostcentersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpfacostcentersID)>=0)
{
return "tbl";
}
else
{
return "hide";
}
}
//end of Grid Codes erpfacostcenters

}



