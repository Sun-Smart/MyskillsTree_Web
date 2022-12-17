import { bocountryService } from './../../../service/bocountry.service';
import { bocountry } from './../../../model/bocountry.model';
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
import { bostate } from './../../../model/bostate.model';
//FK services
import { bostateComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.component';
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
selector: 'app-bocountry',
templateUrl: './bocountry.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bocountryComponent implements OnInit {
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
bfilterPopulatebocountries:boolean=false;
bfilterPopulatebostates:boolean=false;
@ViewChild('tblbostatessource',{static:false}) tblbostatessource: Ng2SmartTableComponent;
 bocountryForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bostatesvisiblelist:any;
bostateshidelist:any;

DeletedbostateIDs: string="";
bostatesID: string = "1";
bostatesselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bocountryservice: bocountryService,
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
this.bocountryForm  = this.fb.group({pk:[null],countryid: [null],
code: [null, Validators.required],
name: [null, Validators.required],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bocountryForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bocountryForm.dirty && this.bocountryForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.countryid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.countryid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.countryid && pkDetail) {
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
let bocountryid = null;

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
this.formid=bocountryid;
//this.sharedService.alert(bocountryid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbostatesTableConfig();
  setTimeout(() => {
  this.SetbostatesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.bocountryservice.getbocountriesList().then(res => {
      this.pkList = res as bocountry[];
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
this.bocountryForm.markAsUntouched();
this.bocountryForm.markAsPristine();
}



resetForm() {
if (this.bocountryForm != null)
this.bocountryForm.reset();
this.bocountryForm.patchValue({
});
setTimeout(() => {
this.bocountryservice.bostates=[];
this.bostatesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let countryid = this.bocountryForm.get('countryid').value;
        if(countryid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bocountryservice.deletebocountry(countryid).then(res =>
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
    this.bocountryForm.patchValue({
        countryid: null
    });
    if(this.bocountryservice.formData.countryid!=null)this.bocountryservice.formData.countryid=null;
for (let i=0;i<this.bocountryservice.bostates.length;i++) {
this.bocountryservice.bostates[i].stateid=null;
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
this.bocountryForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bocountryForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bocountryForm.controls[key]!=undefined)this.bocountryForm.controls[key].disable({onlySelf: true});
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
this.bocountryservice.getbocountriesByEID(pkcol).then(res => {

this.bocountryservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bocountry.countryid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bocountry.countryid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bocountryForm.patchValue({
countryid: res.bocountry.countryid,
code: res.bocountry.code,
name: res.bocountry.name,
status: res.bocountry.status,
statusdesc: res.bocountry.statusdesc,
});
this.bostatesvisiblelist=res.bostatesvisiblelist;
//Child Tables if any
this.bocountryservice.bostates = res.bostates;
this.SetbostatesTableConfig();
this.bostatesLoadTable();
  setTimeout(() => {
  this.SetbostatesTableddConfig();
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
  for (let key in this.bocountryForm.controls) {
    if (this.bocountryForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bocountryForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bocountryForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bocountryForm.value;
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
Object.keys(this.bocountryForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bocountryForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bocountryForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bocountryservice.formData=this.bocountryForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bocountryForm.controls[key] != null)
    {
        this.bocountryservice.formData[key] = this.bocountryForm.controls[key].value;
    }
}
}
}
this.bocountryservice.formData.DeletedbostateIDs = this.DeletedbostateIDs;
console.log(this.bocountryservice.formData);
this.bocountryservice.formData=this.bocountryForm.value;
this.bocountryservice.saveOrUpdatebocountries().subscribe(
async res => {
if (this.bostatessource.data)
{
    for (let i = 0; i < this.bostatessource.data.length; i++)
    {
        if (this.bostatessource.data[i].fileattachmentlist)await this.sharedService.upload(this.bostatessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bocountry);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bocountryservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bocountry);
}
else
{
this.FillData(res);
}
}
this.bocountryForm.markAsUntouched();
this.bocountryForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbostate(event:any,stateid:any, countryid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bostateComponent, 
{
data:  {  showview:this.showview,save:false,event,stateid, countryid,visiblelist:this.bostatesvisiblelist,  hidelist:this.bostateshidelist,ScreenType:2  },
header: 'States'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bostatessource.add(res);
this.bostatessource.refresh();
}
else
{
this.bostatessource.update(event.data, res);
}
}
});
}

onDeletebostate(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbostateIDs += childID + ",";
this.bocountryservice.bostates.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bostates
bostatessettings:any;
bostatessource: any;

showbostatesCheckbox()
{
debugger;
if(this.tblbostatessource.settings['selectMode']== 'multi')this.tblbostatessource.settings['selectMode']= 'single';
else
this.tblbostatessource.settings['selectMode']= 'multi';
this.tblbostatessource.initGrid();
}
deletebostatesAll()
{
this.tblbostatessource.settings['selectMode'] = 'single';
}
showbostatesFilter()
{
  setTimeout(() => {
  this.SetbostatesTableddConfig();
  });
      if(this.tblbostatessource.settings!=null)this.tblbostatessource.settings['hideSubHeader'] =!this.tblbostatessource.settings['hideSubHeader'];
this.tblbostatessource.initGrid();
}
showbostatesInActive()
{
}
enablebostatesInActive()
{
}
async SetbostatesTableddConfig()
{
if(!this.bfilterPopulatebostates){
}
this.bfilterPopulatebostates=true;
}
async bostatesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbostatesTableConfig()
{
this.bostatessettings = {
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
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
bostatesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bostatesID)>=0)
{
this.bostatessource=new LocalDataSource();
this.bostatessource.load(this.bocountryservice.bostates as  any as LocalDataSource);
this.bostatessource.setPaging(1, 20, true);
}
}

//external to inline
/*
bostatesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bocountryservice.bostates.length == 0)
{
    this.tblbostatessource.grid.createFormShown = true;
}
else
{
    let obj = new bostate();
    this.bocountryservice.bostates.push(obj);
    this.bostatessource.refresh();
    if ((this.bocountryservice.bostates.length / this.bostatessource.getPaging().perPage).toFixed(0) + 1 != this.bostatessource.getPaging().page)
    {
        this.bostatessource.setPage((this.bocountryservice.bostates.length / this.bostatessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbostatessource.grid.edit(this.tblbostatessource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.bostatessource.data.indexOf(event.data);
this.onDeletebostate(event,event.data.stateid,((this.bostatessource.getPaging().page-1) *this.bostatessource.getPaging().perPage)+index);
this.bostatessource.refresh();
}
break;
}
}

*/
bostatesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbostate(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbostate(event,event.data.stateid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeletebostate(event,event.data.stateid,((this.bostatessource.getPaging().page-1) *this.bostatessource.getPaging().perPage)+event.index);
this.bostatessource.refresh();
}
break;
}
}
bostatesonDelete(obj) {
let stateid=obj.data.stateid;
if (confirm('Are you sure to delete this record ?')) {
this.bocountryservice.deletebocountry(stateid).then(res=>
this.bostatesLoadTable()
);
}
}
bostatesPaging(val)
{
debugger;
this.bostatessource.setPaging(1, val, true);
}

handlebostatesGridSelected(event:any) {
this.bostatesselectedindex=this.bocountryservice.bostates.findIndex(i => i.stateid === event.data.stateid);
}
IsbostatesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bostatesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bostates

}



