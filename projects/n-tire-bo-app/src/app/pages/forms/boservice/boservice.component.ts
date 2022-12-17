import { boserviceService } from '../../../../../../n-tire-bo-app/src/app/service/boservice.service';
import { boservice } from '../../../../../../n-tire-bo-app/src/app/model/boservice.model';
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
import { hlpserviceavailabilit } from '../../../../../../n-tire-help-desk-app/src/app/model/hlpserviceavailabilit.model';
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
selector: 'app-boservice',
templateUrl: './boservice.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boserviceComponent implements OnInit {
viewhtml:any='';//stores html view of the screen
showview:boolean=false;//view or edit mode
theme:string="";//current theme
formdata: any;//current form data
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
ShowTableslist:string[]=null;
data:any;
data3:any=[];
bfilterPopulateboservices:boolean=false;
databoservicescategory3:any=[];
databoservicesservicestatus3:any=[];
databoservicespriority3:any=[];
bfilterPopulatehlpserviceavailabilities:boolean=false;
@ViewChild('tblhlpserviceavailabilitiessource',{static:false}) tblhlpserviceavailabilitiessource: Ng2SmartTableComponent;
 boserviceForm: FormGroup;
categoryList: boconfigvalue[]=[];//dropdown
servicestatusList: boconfigvalue[]=[];//dropdown
priorityList: boconfigvalue[]=[];//dropdown
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



hlpserviceavailabilitiesvisiblelist:any;
hlpserviceavailabilitieshidelist:any;

DeletedhlpserviceavailabilitIDs: string="";
hlpserviceavailabilitiesID: string = "1";
hlpserviceavailabilitiesselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
public ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private boserviceservice: boserviceService,
private fb: FormBuilder,
private sharedService: SharedService,
public sessionService: SessionService,
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
this.boserviceForm  = this.fb.group({pk:[null],serviceid: [null],
sourcefield: [null],
sourcereference: [null],
description: [null],
category: [null],
categorydesc: [null],
owner: [null],
parentid: [null],
products: [null],
servicestatus: [null],
servicestatusdesc: [null],
priority: [null],
prioritydesc: [null],
sla: [null],
responsibilitity: [null],
cost: [null],
outsourcetosupplier: [null],
preferredsupplierid: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.boserviceForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop:any)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boserviceForm.dirty && this.boserviceForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.serviceid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.serviceid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.serviceid && pkDetail) {
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
let boserviceid = null;

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
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
}
this.formid=boserviceid;
//this.sharedService.alert(boserviceid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethlpserviceavailabilitiesTableConfig();
  setTimeout(() => {
  this.SethlpserviceavailabilitiesTableddConfig();
  });

this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("category").then((res:any) => this.categoryList = res as boconfigvalue[]);
this.configservice.getList("servicestatus").then((res:any) => this.servicestatusList = res as boconfigvalue[]);
this.configservice.getList("priority").then((res:any) => this.priorityList = res as boconfigvalue[]);

//autocomplete
    this.boserviceservice.getboservicesList().then((res:any) => {
      this.pkList = res as boservice[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.boserviceForm.markAsUntouched();
this.boserviceForm.markAsPristine();
}



resetForm() {
if (this.boserviceForm != null)
this.boserviceForm.reset();
this.boserviceForm.patchValue({
});
setTimeout(() => {
this.boserviceservice.hlpserviceavailabilities=[];
this.hlpserviceavailabilitiesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.boserviceForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let serviceid = this.boserviceForm.get('serviceid').value;
        if(serviceid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boserviceservice.deleteboservice(serviceid).then((res:any) =>
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
    this.boserviceForm.patchValue({
        serviceid: null
    });
    if(this.boserviceservice.formData.serviceid!=null)this.boserviceservice.formData.serviceid=null;
for (let i=0;i<this.boserviceservice.hlpserviceavailabilities.length;i++) {
this.boserviceservice.hlpserviceavailabilities[i].availabilityid=null;
}
    }
    PopulateFromMainScreen(mainscreendata,bdisable)
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
        json='{"'+key+'": '+mainscreendata[key] +' }';  
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
        if(this.boserviceForm.controls[key]!=null)
{
this.boserviceForm.patchValue(json);
         if(bdisable)this.boserviceForm.controls[key].disable({onlySelf: true});
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
categoryonChange(evt:any){
let e=this.f.category.value as any;
this.boserviceForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}
servicestatusonChange(evt:any){
let e=this.f.servicestatus.value as any;
this.boserviceForm.patchValue({servicestatusdesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.boserviceForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){this.boserviceservice.getboservicesByEID(pkcol).then((res:any) => {

this.formdata=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boservice.serviceid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.boservice.serviceid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boserviceForm.patchValue({
serviceid: res.boservice.serviceid,
sourcefield: res.boservice.sourcefield,
sourcereference: res.boservice.sourcereference,
description: res.boservice.description,
category: res.boservice.category,
categorydesc: res.boservice.categorydesc,
owner: res.boservice.owner,
parentid: res.boservice.parentid,
products: res.boservice.products,
servicestatus: res.boservice.servicestatus,
servicestatusdesc: res.boservice.servicestatusdesc,
priority: res.boservice.priority,
prioritydesc: res.boservice.prioritydesc,
sla: res.boservice.sla,
responsibilitity: res.boservice.responsibilitity,
cost: res.boservice.cost,
outsourcetosupplier: res.boservice.outsourcetosupplier,
preferredsupplierid: res.boservice.preferredsupplierid,
remarks: JSON.parse(res.boservice.remarks),
status: res.boservice.status,
statusdesc: res.boservice.statusdesc,
});
this.hlpserviceavailabilitiesvisiblelist=res.hlpserviceavailabilitiesvisiblelist;
//Child Tables if any
this.boserviceservice.hlpserviceavailabilities = res.hlpserviceavailabilit;
this.SethlpserviceavailabilitiesTableConfig();
this.hlpserviceavailabilitiesLoadTable();
  setTimeout(() => {
  this.SethlpserviceavailabilitiesTableddConfig();
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
  for (let key in this.boserviceForm.controls) {
    if (this.boserviceForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boserviceForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boserviceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.boserviceForm.value;
obj.remarks=JSON.stringify(this.boserviceForm.get('remarks').value);
console.log(obj);
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
Object.keys(this.boserviceForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boserviceForm.get(key)!.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boserviceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boserviceservice.formData=this.boserviceForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boserviceForm.controls[key] != null)
    {
        this.boserviceservice.formData[key] = this.boserviceForm.controls[key].value;
    }
}
}
}
this.boserviceservice.formData.remarks=JSON.stringify(this.boserviceForm.get('remarks').value);
//this.boserviceservice.formData.DeletedhlpserviceavailabilitIDs = this.DeletedhlpserviceavailabilitIDs;
console.log(this.boserviceservice.formData);
this.boserviceservice.saveOrUpdateboservices().subscribe(
async (res:any) => {
if (this.hlpserviceavailabilitiessource.data)
{
    for (let i = 0; i < this.hlpserviceavailabilitiessource.data.length; i++)
    {
        if (this.hlpserviceavailabilitiessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hlpserviceavailabilitiessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boservice);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boserviceservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boservice);
}
else
{
this.FillData(res);
}
}
this.boserviceForm.markAsUntouched();
this.boserviceForm.markAsPristine();
},
(err:any) => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

onDeletehlpserviceavailabilit(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhlpserviceavailabilitIDs += childID + ",";
this.boserviceservice.hlpserviceavailabilities.splice(i, 1);
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hlpserviceavailabilities
hlpserviceavailabilitiessettings:any;
hlpserviceavailabilitiessource: any;

showhlpserviceavailabilitiesCheckbox()
{
debugger;
if(this.tblhlpserviceavailabilitiessource.settings['selectMode']== 'multi')this.tblhlpserviceavailabilitiessource.settings['selectMode']= 'single';
else
this.tblhlpserviceavailabilitiessource.settings['selectMode']= 'multi';
this.tblhlpserviceavailabilitiessource.initGrid();
}
deletehlpserviceavailabilitiesAll()
{
this.tblhlpserviceavailabilitiessource.settings['selectMode'] = 'single';
}
showhlpserviceavailabilitiesFilter()
{
  setTimeout(() => {
  this.SethlpserviceavailabilitiesTableddConfig();
  });
      if(this.tblhlpserviceavailabilitiessource.settings!=null)this.tblhlpserviceavailabilitiessource.settings['hideSubHeader'] =!this.tblhlpserviceavailabilitiessource.settings['hideSubHeader'];
this.tblhlpserviceavailabilitiessource.initGrid();
}
showhlpserviceavailabilitiesInActive()
{
}
enablehlpserviceavailabilitiesInActive()
{
}
async SethlpserviceavailabilitiesTableddConfig()
{
if(!this.bfilterPopulatehlpserviceavailabilities){
}
this.bfilterPopulatehlpserviceavailabilities=true;
}
async hlpserviceavailabilitiesbeforesave(event){
event.confirm.resolve(event.newData);



}
SethlpserviceavailabilitiesTableConfig()
{
this.hlpserviceavailabilitiessettings = {
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
servicehours: {
title: 'Service Hours',
type: 'number',
filter:true,
},
downhours: {
title: 'Down Hours',
type: 'number',
filter:true,
},
availability: {
title: 'Availability',
type: 'number',
filter:true,
},
},
};
}
hlpserviceavailabilitiesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.hlpserviceavailabilitiesID)>=0)
{
this.hlpserviceavailabilitiessource=new LocalDataSource();
this.hlpserviceavailabilitiessource.load(this.boserviceservice.hlpserviceavailabilities as  any as LocalDataSource);
this.hlpserviceavailabilitiessource.setPaging(1, 20, true);
}
}
hlpserviceavailabilitiesroute(event,action) {
switch ( action) {
case 'create':
if (this.boserviceservice.hlpserviceavailabilities.length == 0)
{
    this.tblhlpserviceavailabilitiessource.grid.createFormShown = true;
}
else
{
    let obj = new hlpserviceavailabilit();
    this.boserviceservice.hlpserviceavailabilities.push(obj);
    this.hlpserviceavailabilitiessource.refresh();
    if ((this.boserviceservice.hlpserviceavailabilities.length / this.hlpserviceavailabilitiessource.getPaging().perPage).toFixed(0) + 1 != this.hlpserviceavailabilitiessource.getPaging().page)
    {
        this.hlpserviceavailabilitiessource.setPage((this.boserviceservice.hlpserviceavailabilities.length / this.hlpserviceavailabilitiessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhlpserviceavailabilitiessource.grid.edit(this.tblhlpserviceavailabilitiessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hlpserviceavailabilitiessource.data.indexOf(event.data);
this.onDeletehlpserviceavailabilit(event,event.data.availabilityid,((this.hlpserviceavailabilitiessource.getPaging().page-1) *this.hlpserviceavailabilitiessource.getPaging().perPage)+index);
this.hlpserviceavailabilitiessource.refresh();
break;
}
}
hlpserviceavailabilitiesPaging(val)
{
debugger;
this.hlpserviceavailabilitiessource.setPaging(1, val, true);
}

handlehlpserviceavailabilitiesGridSelected(event) {
this.hlpserviceavailabilitiesselectedindex=this.boserviceservice.hlpserviceavailabilities.findIndex(i => i.availabilityid === event.data.availabilityid);
}
IshlpserviceavailabilitiesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.hlpserviceavailabilitiesID)>=0)
{
return "tbl";
}
else
{
return "hide";
}
}
//end of Grid Codes hlpserviceavailabilities

}



