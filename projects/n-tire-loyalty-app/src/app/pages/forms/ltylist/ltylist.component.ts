import { ltylistService } from './../../../service/ltylist.service';
import { ltylist } from './../../../model/ltylist.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

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
import { ltycustomerlist } from './../../../model/ltycustomerlist.model';
import { ltycustomerlistComponent } from './../../../pages/forms/ltycustomerlist/ltycustomerlist.component';
//FK services
import { crmcustomermaster,IcrmcustomermasterResponse } from '../../../../../../n-tire-crm-app/src/app/model/crmcustomermaster.model';
import { crmcustomermasterComponent } from '../../../../../../n-tire-crm-app/src/app/pages/forms/crmcustomermaster/crmcustomermaster.component';
import { crmcustomermasterService } from '../../../../../../n-tire-crm-app/src/app/service/crmcustomermaster.service';
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
selector: 'app-ltylist',
templateUrl: './ltylist.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltylistComponent implements OnInit {
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
bfilterPopulateltylists:boolean=false;
dataltycustomerlistscustomerid3:any=[];
bfilterPopulateltycustomerlists:boolean=false;
@ViewChild('tblltycustomerlistssource',{static:false}) tblltycustomerlistssource: Ng2SmartTableComponent;
 ltylistForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;
sourcekey:any;



ltycustomerlistsvisiblelist:any;
ltycustomerlistshidelist:any;

DeletedltycustomerlistIDs: string="";
ltycustomerlistsID: string = "1";
ltycustomerlistsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private ltylistservice: ltylistService,
private crmcustomermasterservice: crmcustomermasterService,
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
this.ltylistForm  = this.fb.group({
pk:[null],
listid: [null],
listname: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.ltylistForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltylistForm.dirty && this.ltylistForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.listid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.listid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.listid && pkDetail) {
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
let ltylistid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
    this.sourcekey= this.currentRoute.snapshot.paramMap.get('sourcekey');
}
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
this.formid=ltylistid;
//this.sharedService.alert(ltylistid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetltycustomerlistsTableConfig();
  setTimeout(() => {
  this.SetltycustomerlistsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.ltylistservice.getltylistsList().then(res => {
      this.pkList = res as ltylist[];
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
this.ltylistForm.markAsUntouched();
this.ltylistForm.markAsPristine();
}



resetForm() {
if (this.ltylistForm != null)
this.ltylistForm.reset();
this.ltylistForm.patchValue({
});
setTimeout(() => {
this.ltylistservice.ltycustomerlists=[];
this.ltylistservice.Insertltycustomerlists=[];
this.ltycustomerlistsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let listid = this.ltylistForm.get('listid').value;
        if(listid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltylistservice.deleteltylist(listid).then(res =>
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
    this.ltylistForm.patchValue({
        listid: null
    });
    if(this.ltylistservice.formData.listid!=null)this.ltylistservice.formData.listid=null;
for (let i=0;i<this.ltylistservice.ltycustomerlists.length;i++) {
this.ltylistservice.ltycustomerlists[i].customerlistid=null;
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
this.ltylistForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltylistForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltylistForm.controls[key]!=undefined)this.ltylistForm.controls[key].disable({onlySelf: true});
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
this.ltylistservice.getltylistsByEID(pkcol).then(res => {

this.ltylistservice.formData=res.ltylist;
let formproperty=res.ltylist.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltylist.pkcol;
this.formid=res.ltylist.listid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltylist.listid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltylistForm.patchValue({
listid: res.ltylist.listid,
listname: res.ltylist.listname,
status: res.ltylist.status,
statusdesc: res.ltylist.statusdesc,
});
this.ltycustomerlistsvisiblelist=res.ltycustomerlistsvisiblelist;
//Child Tables if any
this.ltylistservice.ltycustomerlists = res.ltycustomerlists;
this.SetltycustomerlistsTableConfig();
this.ltycustomerlistsLoadTable();
  setTimeout(() => {
  this.SetltycustomerlistsTableddConfig();
  });
this.ltylistservice.Insertltycustomerlists=[];
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
  for (let key in this.ltylistForm.controls) {
    if (this.ltylistForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltylistForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltylistForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.ltylistForm.value;
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
Object.keys(this.ltylistForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltylistForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltylistForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltylistservice.formData=this.ltylistForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltylistForm.controls[key] != null)
    {
        this.ltylistservice.formData[key] = this.ltylistForm.controls[key].value;
    }
}
}
}
this.ltylistservice.formData.DeletedltycustomerlistIDs = this.DeletedltycustomerlistIDs;
console.log(this.ltylistservice.formData);
this.ltylistservice.formData=this.ltylistForm.value;
this.ltylistservice.saveOrUpdateltylists().subscribe(
async res => {
if (this.ltycustomerlistssource.data)
{
    for (let i = 0; i < this.ltycustomerlistssource.data.length; i++)
    {
        if (this.ltycustomerlistssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ltycustomerlistssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltylist);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltylistservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltylist);
}
else
{
this.FillData(res);
}
}
this.ltylistForm.markAsUntouched();
this.ltylistForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes ltycustomerlists
onCustomltycustomerlistsAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(crmcustomermasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
          header: 'crmcustomermaster details'
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
ltycustomerlistssettings:any;
ltycustomerlistssource: any;

showltycustomerlistsCheckbox()
{
debugger;
if(this.tblltycustomerlistssource.settings['selectMode']== 'multi')this.tblltycustomerlistssource.settings['selectMode']= 'single';
else
this.tblltycustomerlistssource.settings['selectMode']= 'multi';
this.tblltycustomerlistssource.initGrid();
}
deleteltycustomerlistsAll()
{
this.tblltycustomerlistssource.settings['selectMode'] = 'single';
}
showltycustomerlistsFilter()
{
  setTimeout(() => {
  this.SetltycustomerlistsTableddConfig();
  });
      if(this.tblltycustomerlistssource.settings!=null)this.tblltycustomerlistssource.settings['hideSubHeader'] =!this.tblltycustomerlistssource.settings['hideSubHeader'];
this.tblltycustomerlistssource.initGrid();
}
showltycustomerlistsInActive()
{
}
enableltycustomerlistsInActive()
{
}
async SetltycustomerlistsTableddConfig()
{
if(!this.bfilterPopulateltycustomerlists){

this.crmcustomermasterservice.getcrmcustomermastersList().then(res=>
{
var datacustomerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataltycustomerlistscustomerid3.push(defaultobj);
for(let i=0; i<datacustomerid2.length; i++){
var obj= { value: datacustomerid2[i].customerid, title:datacustomerid2[i].lastname};
this.dataltycustomerlistscustomerid3.push(obj);
}
if((this.tblltycustomerlistssource.settings as any).columns['customerid'])
{
(this.tblltycustomerlistssource.settings as any).columns['customerid'].editor.config.list=JSON.parse(JSON.stringify(this.dataltycustomerlistscustomerid3));
this.tblltycustomerlistssource.initGrid();
}
});
}
this.bfilterPopulateltycustomerlists=true;
}
async ltycustomerlistsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetltycustomerlistsTableConfig()
{
this.ltycustomerlistssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
customerlistid: {
title: 'Customer List',
type: '',
},
companyname: {
title: 'Companyname',
type: '',
},
firstname: {
title: 'Firstname',
type: '',
},
lastname: {
title: 'Lastname',
type: '',
},
},
};
}
ltycustomerlistsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltycustomerlistsID)>=0)
{
this.ltycustomerlistssource=new LocalDataSource();
this.ltycustomerlistssource.load(this.ltylistservice.ltycustomerlists as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblltycustomerlistssource!=null)
{this.tblltycustomerlistssource.grid.getRows().forEach((row:any) => {
if(row.data.customerlistid!=null && row.data.customerlistid!="")
{
this.ltylistservice.Insertltycustomerlists.push(row.data);
this.tblltycustomerlistssource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
ltycustomerlistsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.ltylistservice.ltycustomerlists.length == 0)
{
    this.tblltycustomerlistssource.grid.createFormShown = true;
}
else
{
    let obj = new ltycustomerlist();
    this.ltylistservice.ltycustomerlists.push(obj);
    this.ltycustomerlistssource.refresh();
    if ((this.ltylistservice.ltycustomerlists.length / this.ltycustomerlistssource.getPaging().perPage).toFixed(0) + 1 != this.ltycustomerlistssource.getPaging().page)
    {
        this.ltycustomerlistssource.setPage((this.ltylistservice.ltycustomerlists.length / this.ltycustomerlistssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblltycustomerlistssource.grid.edit(this.tblltycustomerlistssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ltycustomerlistssource.data.indexOf(event.data);
this.onDeleteltycustomerlist(event,event.data.customerlistid,((this.ltycustomerlistssource.getPaging().page-1) *this.ltycustomerlistssource.getPaging().perPage)+index);
this.ltycustomerlistssource.refresh();
break;
}
}

*/
ltycustomerlistsPaging(val)
{
debugger;
this.ltycustomerlistssource.setPaging(1, val, true);
}

handleltycustomerlistsGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.customerlistid==null || event.data.customerlistid=="")
{
var obj={listid:this.formid,customerid:event.data.customerid}
this.ltylistservice.Insertltycustomerlists.push(obj as any);
}
else
{
var deletedids=this.DeletedltycustomerlistIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.customerlistid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.customerlistid!=null && event.data.customerlistid!="")this.DeletedltycustomerlistIDs += event.data.customerlistid + ","; 
}
}
IsltycustomerlistsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltycustomerlistsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ltycustomerlists

}



