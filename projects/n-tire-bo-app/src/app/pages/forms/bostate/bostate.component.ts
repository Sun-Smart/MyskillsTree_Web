import { bostateService } from './../../../service/bostate.service';
import { bostate } from './../../../model/bostate.model';
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
import { bocity } from './../../../model/bocity.model';
//FK services
import { bocityComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.component';
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
selector: 'app-bostate',
templateUrl: './bostate.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bostateComponent implements OnInit {
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
bfilterPopulatebostates:boolean=false;
bfilterPopulatebocities:boolean=false;
@ViewChild('tblbocitiessource',{static:false}) tblbocitiessource: Ng2SmartTableComponent;
 bostateForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bocitiesvisiblelist:any;
bocitieshidelist:any;

DeletedbocityIDs: string="";
bocitiesID: string = "1";
bocitiesselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bostateservice: bostateService,
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
this.bostateForm  = this.fb.group({pk:[null],stateid: [null],
code: [null, Validators.required],
name: [null, Validators.required],
countryid: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bostateForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bostateForm.dirty && this.bostateForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.stateid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.stateid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.stateid && pkDetail) {
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
let bostateid = null;

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
this.formid=bostateid;
//this.sharedService.alert(bostateid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbocitiesTableConfig();
  setTimeout(() => {
  this.SetbocitiesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.bostateservice.getbostatesList().then(res => {
      this.pkList = res as bostate[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.name;

//setting the flag that the screen is not touched 
this.bostateForm.markAsUntouched();
this.bostateForm.markAsPristine();
}



resetForm() {
if (this.bostateForm != null)
this.bostateForm.reset();
this.bostateForm.patchValue({
});
setTimeout(() => {
this.bostateservice.bocities=[];
this.bocitiesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let stateid = this.bostateForm.get('stateid').value;
        if(stateid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bostateservice.deletebostate(stateid).then(res =>
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
    this.bostateForm.patchValue({
        stateid: null
    });
    if(this.bostateservice.formData.stateid!=null)this.bostateservice.formData.stateid=null;
for (let i=0;i<this.bostateservice.bocities.length;i++) {
this.bostateservice.bocities[i].cityid=null;
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
this.bostateForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bostateForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bostateForm.controls[key]!=undefined)this.bostateForm.controls[key].disable({onlySelf: true});
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

async PopulateScreen(pkcol:any){
this.bostateservice.getbostatesByEID(pkcol).then(res => {

this.bostateservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bostate.stateid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bostate.stateid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bostateForm.patchValue({
stateid: res.bostate.stateid,
code: res.bostate.code,
name: res.bostate.name,
countryid: res.bostate.countryid,
status: res.bostate.status,
statusdesc: res.bostate.statusdesc,
});
this.bocitiesvisiblelist=res.bocitiesvisiblelist;
//Child Tables if any
this.bostateservice.bocities = res.bocities;
this.SetbocitiesTableConfig();
this.bocitiesLoadTable();
  setTimeout(() => {
  this.SetbocitiesTableddConfig();
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
  for (let key in this.bostateForm.controls) {
    if (this.bostateForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bostateForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bostateForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bostateForm.value;
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
Object.keys(this.bostateForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bostateForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bostateForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bostateservice.formData=this.bostateForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bostateForm.controls[key] != null)
    {
        this.bostateservice.formData[key] = this.bostateForm.controls[key].value;
    }
}
}
}
//this.bostateservice.formData.DeletedbocityIDs = this.DeletedbocityIDs;
console.log(this.bostateservice.formData);
this.bostateservice.formData=this.bostateForm.value;
this.bostateservice.saveOrUpdatebostates().subscribe(
async res => {
if (this.bocitiessource.data)
{
    for (let i = 0; i < this.bocitiessource.data.length; i++)
    {
        if (this.bocitiessource.data[i].fileattachmentlist)await this.sharedService.upload(this.bocitiessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bostate);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bostateservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bostate);
}
else
{
this.FillData(res);
}
}
this.bostateForm.markAsUntouched();
this.bostateForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbocity(event:any,cityid:any, stateid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bocityComponent, 
{
data:  {  showview:this.showview,save:false,event,cityid, stateid,visiblelist:this.bocitiesvisiblelist,  hidelist:this.bocitieshidelist,ScreenType:2  },
header: 'Cities'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bocitiessource.add(res);
this.bocitiessource.refresh();
}
else
{
this.bocitiessource.update(event.data, res);
}
}
});
}

onDeletebocity(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbocityIDs += childID + ",";
this.bostateservice.bocities.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bocities
bocitiessettings:any;
bocitiessource: any;

showbocitiesCheckbox()
{
debugger;
if(this.tblbocitiessource.settings['selectMode']== 'multi')this.tblbocitiessource.settings['selectMode']= 'single';
else
this.tblbocitiessource.settings['selectMode']= 'multi';
this.tblbocitiessource.initGrid();
}
deletebocitiesAll()
{
this.tblbocitiessource.settings['selectMode'] = 'single';
}
showbocitiesFilter()
{
  setTimeout(() => {
  this.SetbocitiesTableddConfig();
  });
      if(this.tblbocitiessource.settings!=null)this.tblbocitiessource.settings['hideSubHeader'] =!this.tblbocitiessource.settings['hideSubHeader'];
this.tblbocitiessource.initGrid();
}
showbocitiesInActive()
{
}
enablebocitiesInActive()
{
}
async SetbocitiesTableddConfig()
{
if(!this.bfilterPopulatebocities){
}
this.bfilterPopulatebocities=true;
}
async bocitiesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbocitiesTableConfig()
{
this.bocitiessettings = {
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
code: {
title: 'Code',
type: '',
filter:true,
},
name: {
title: 'Name',
type: '',
filter:true,
},
},
};
}
bocitiesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bocitiesID)>=0)
{
this.bocitiessource=new LocalDataSource();
this.bocitiessource.load(this.bostateservice.bocities as  any as LocalDataSource);
this.bocitiessource.setPaging(1, 20, true);
}
}

//external to inline
/*
bocitiesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bostateservice.bocities.length == 0)
{
    this.tblbocitiessource.grid.createFormShown = true;
}
else
{
    let obj = new bocity();
    this.bostateservice.bocities.push(obj);
    this.bocitiessource.refresh();
    if ((this.bostateservice.bocities.length / this.bocitiessource.getPaging().perPage).toFixed(0) + 1 != this.bocitiessource.getPaging().page)
    {
        this.bocitiessource.setPage((this.bostateservice.bocities.length / this.bocitiessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbocitiessource.grid.edit(this.tblbocitiessource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.bocitiessource.data.indexOf(event.data);
this.onDeletebocity(event,event.data.cityid,((this.bocitiessource.getPaging().page-1) *this.bocitiessource.getPaging().perPage)+index);
this.bocitiessource.refresh();
}
break;
}
}

*/
bocitiesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbocity(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbocity(event,event.data.cityid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeletebocity(event,event.data.cityid,((this.bocitiessource.getPaging().page-1) *this.bocitiessource.getPaging().perPage)+event.index);
this.bocitiessource.refresh();
}
break;
}
}
bocitiesonDelete(obj) {
let cityid=obj.data.cityid;
if (confirm('Are you sure to delete this record ?')) {
this.bostateservice.deletebostate(cityid).then(res=>
this.bocitiesLoadTable()
);
}
}
bocitiesPaging(val)
{
debugger;
this.bocitiessource.setPaging(1, val, true);
}

handlebocitiesGridSelected(event:any) {
this.bocitiesselectedindex=this.bostateservice.bocities.findIndex(i => i.cityid === event.data.cityid);
}
IsbocitiesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bocitiesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bocities

}



