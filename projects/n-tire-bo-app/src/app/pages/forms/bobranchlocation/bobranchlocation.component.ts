import { bobranchlocationService } from './../../../service/bobranchlocation.service';
import { bobranchlocation } from './../../../model/bobranchlocation.model';
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
import { bobranchsublocation } from './../../../model/bobranchsublocation.model';
//FK services
import { bobranchsublocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchsublocation/bobranchsublocation.component';
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
selector: 'app-bobranchlocation',
templateUrl: './bobranchlocation.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bobranchlocationComponent implements OnInit {
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
bfilterPopulatebobranchlocations:boolean=false;
databobranchlocationslocationcode3:any=[];
databobranchsublocationslocationid3:any=[];
bfilterPopulatebobranchsublocations:boolean=false;
@ViewChild('tblbobranchsublocationssource',{static:false}) tblbobranchsublocationssource: Ng2SmartTableComponent;
 bobranchlocationForm: FormGroup;
locationcodeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bobranchsublocationsvisiblelist:any;
bobranchsublocationshidelist:any;

DeletedbobranchsublocationIDs: string="";
bobranchsublocationsID: string = "1";
bobranchsublocationsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bobranchlocationservice: bobranchlocationService,
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
this.bobranchlocationForm  = this.fb.group({pk:[null],branchid: [null],
locationid: [null],
locationcode: [null],
locationcodedesc: [null],
locationname: [null],
tag: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bobranchlocationForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bobranchlocationForm.dirty && this.bobranchlocationForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.locationid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.locationid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.locationid && pkDetail) {
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
let bobranchlocationid = null;

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
this.formid=bobranchlocationid;
//this.sharedService.alert(bobranchlocationid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbobranchsublocationsTableConfig();
  setTimeout(() => {
  this.SetbobranchsublocationsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("locationcode").then(res => this.locationcodeList = res as boconfigvalue[]);

//autocomplete
    this.bobranchlocationservice.getbobranchlocationsList().then(res => {
      this.pkList = res as bobranchlocation[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.locationname;

//setting the flag that the screen is not touched 
this.bobranchlocationForm.markAsUntouched();
this.bobranchlocationForm.markAsPristine();
}



resetForm() {
if (this.bobranchlocationForm != null)
this.bobranchlocationForm.reset();
this.bobranchlocationForm.patchValue({
});
setTimeout(() => {
this.bobranchlocationservice.bobranchsublocations=[];
this.bobranchsublocationsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let locationid = this.bobranchlocationForm.get('locationid').value;
        if(locationid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bobranchlocationservice.deletebobranchlocation(locationid).then(res =>
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
    this.bobranchlocationForm.patchValue({
        locationid: null
    });
    if(this.bobranchlocationservice.formData.locationid!=null)this.bobranchlocationservice.formData.locationid=null;
for (let i=0;i<this.bobranchlocationservice.bobranchsublocations.length;i++) {
this.bobranchlocationservice.bobranchsublocations[i].sublocationid=null;
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
        else if(key=="tag")
this.bobranchlocationForm.patchValue({"tag":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.bobranchlocationForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bobranchlocationForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bobranchlocationForm.controls[key]!=undefined)this.bobranchlocationForm.controls[key].disable({onlySelf: true});
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
locationcodeonChange(evt:any){
let e=this.f.locationcode.value as any;
this.bobranchlocationForm.patchValue({locationcodedesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){
this.bobranchlocationservice.getbobranchlocationsByEID(pkcol).then(res => {

this.bobranchlocationservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bobranchlocation.locationid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bobranchlocation.locationid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bobranchlocationForm.patchValue({
branchid: res.bobranchlocation.branchid,
locationid: res.bobranchlocation.locationid,
locationcode: res.bobranchlocation.locationcode,
locationcodedesc: res.bobranchlocation.locationcodedesc,
locationname: res.bobranchlocation.locationname,
tag: JSON.parse(res.bobranchlocation.tag),
status: res.bobranchlocation.status,
statusdesc: res.bobranchlocation.statusdesc,
});
this.bobranchsublocationsvisiblelist=res.bobranchsublocationsvisiblelist;
//Child Tables if any
this.bobranchlocationservice.bobranchsublocations = res.bobranchsublocations;
this.SetbobranchsublocationsTableConfig();
this.bobranchsublocationsLoadTable();
  setTimeout(() => {
  this.SetbobranchsublocationsTableddConfig();
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
  for (let key in this.bobranchlocationForm.controls) {
    if (this.bobranchlocationForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bobranchlocationForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bobranchlocationForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bobranchlocationForm.value;
obj.tag=JSON.stringify(this.bobranchlocationForm.get('tag').value);
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
Object.keys(this.bobranchlocationForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bobranchlocationForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bobranchlocationForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bobranchlocationservice.formData=this.bobranchlocationForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bobranchlocationForm.controls[key] != null)
    {
        this.bobranchlocationservice.formData[key] = this.bobranchlocationForm.controls[key].value;
    }
}
}
}
this.bobranchlocationservice.formData.tag=JSON.stringify(this.bobranchlocationForm.get('tag').value);
this.bobranchlocationservice.formData.DeletedbobranchsublocationIDs = this.DeletedbobranchsublocationIDs;
console.log(this.bobranchlocationservice.formData);
this.bobranchlocationservice.formData=this.bobranchlocationForm.value;
this.bobranchlocationservice.saveOrUpdatebobranchlocations().subscribe(
async res => {
if (this.bobranchsublocationssource.data)
{
    for (let i = 0; i < this.bobranchsublocationssource.data.length; i++)
    {
        if (this.bobranchsublocationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bobranchsublocationssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bobranchlocation);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bobranchlocationservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bobranchlocation);
}
else
{
this.FillData(res);
}
}
this.bobranchlocationForm.markAsUntouched();
this.bobranchlocationForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbobranchsublocation(event:any,sublocationid:any, locationid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bobranchsublocationComponent, 
{
data:  {  showview:this.showview,save:false,event,sublocationid, locationid,visiblelist:this.bobranchsublocationsvisiblelist,  hidelist:this.bobranchsublocationshidelist,ScreenType:2,branchid:this.bobranchlocationForm.get('branchid').value  },
header: 'Sub Locations'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bobranchsublocationssource.add(res);
this.bobranchsublocationssource.refresh();
}
else
{
this.bobranchsublocationssource.update(event.data, res);
}
}
});
}

onDeletebobranchsublocation(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbobranchsublocationIDs += childID + ",";
this.bobranchlocationservice.bobranchsublocations.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bobranchsublocations
bobranchsublocationssettings:any;
bobranchsublocationssource: any;

showbobranchsublocationsCheckbox()
{
debugger;
if(this.tblbobranchsublocationssource.settings['selectMode']== 'multi')this.tblbobranchsublocationssource.settings['selectMode']= 'single';
else
this.tblbobranchsublocationssource.settings['selectMode']= 'multi';
this.tblbobranchsublocationssource.initGrid();
}
deletebobranchsublocationsAll()
{
this.tblbobranchsublocationssource.settings['selectMode'] = 'single';
}
showbobranchsublocationsFilter()
{
  setTimeout(() => {
  this.SetbobranchsublocationsTableddConfig();
  });
      if(this.tblbobranchsublocationssource.settings!=null)this.tblbobranchsublocationssource.settings['hideSubHeader'] =!this.tblbobranchsublocationssource.settings['hideSubHeader'];
this.tblbobranchsublocationssource.initGrid();
}
showbobranchsublocationsInActive()
{
}
enablebobranchsublocationsInActive()
{
}
async SetbobranchsublocationsTableddConfig()
{
if(!this.bfilterPopulatebobranchsublocations){

this.bobranchlocationservice.getbobranchlocationsList().then(res=>
{
var datalocationid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databobranchsublocationslocationid3.push(defaultobj);
for(let i=0; i<datalocationid2.length; i++){
var obj= { value: datalocationid2[i].locationid, title:datalocationid2[i].locationname};
this.databobranchsublocationslocationid3.push(obj);
}
if((this.tblbobranchsublocationssource.settings as any).columns['locationid'])
{
(this.tblbobranchsublocationssource.settings as any).columns['locationid'].editor.config.list=JSON.parse(JSON.stringify(this.databobranchsublocationslocationid3));
this.tblbobranchsublocationssource.initGrid();
}
});
}
this.bfilterPopulatebobranchsublocations=true;
}
async bobranchsublocationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbobranchsublocationsTableConfig()
{
this.bobranchsublocationssettings = {
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
locationname: {
title: 'Location Name',
type: '',
filter:true,
},
},
};
}
bobranchsublocationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bobranchsublocationsID)>=0)
{
this.bobranchsublocationssource=new LocalDataSource();
this.bobranchsublocationssource.load(this.bobranchlocationservice.bobranchsublocations as  any as LocalDataSource);
this.bobranchsublocationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bobranchsublocationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bobranchlocationservice.bobranchsublocations.length == 0)
{
    this.tblbobranchsublocationssource.grid.createFormShown = true;
}
else
{
    let obj = new bobranchsublocation();
    this.bobranchlocationservice.bobranchsublocations.push(obj);
    this.bobranchsublocationssource.refresh();
    if ((this.bobranchlocationservice.bobranchsublocations.length / this.bobranchsublocationssource.getPaging().perPage).toFixed(0) + 1 != this.bobranchsublocationssource.getPaging().page)
    {
        this.bobranchsublocationssource.setPage((this.bobranchlocationservice.bobranchsublocations.length / this.bobranchsublocationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbobranchsublocationssource.grid.edit(this.tblbobranchsublocationssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bobranchsublocationssource.data.indexOf(event.data);
this.onDeletebobranchsublocation(event,event.data.sublocationid,((this.bobranchsublocationssource.getPaging().page-1) *this.bobranchsublocationssource.getPaging().perPage)+index);
this.bobranchsublocationssource.refresh();
break;
}
}

*/
bobranchsublocationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbobranchsublocation(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbobranchsublocation(event,event.data.sublocationid,this.formid);
break;
case 'delete':
this.onDeletebobranchsublocation(event,event.data.sublocationid,((this.bobranchsublocationssource.getPaging().page-1) *this.bobranchsublocationssource.getPaging().perPage)+event.index);
this.bobranchsublocationssource.refresh();
break;
}
}
bobranchsublocationsonDelete(obj) {
let sublocationid=obj.data.sublocationid;
if (confirm('Are you sure to delete this record ?')) {
this.bobranchlocationservice.deletebobranchlocation(sublocationid).then(res=>
this.bobranchsublocationsLoadTable()
);
}
}
bobranchsublocationsPaging(val)
{
debugger;
this.bobranchsublocationssource.setPaging(1, val, true);
}

handlebobranchsublocationsGridSelected(event:any) {
this.bobranchsublocationsselectedindex=this.bobranchlocationservice.bobranchsublocations.findIndex(i => i.sublocationid === event.data.sublocationid);
}
IsbobranchsublocationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bobranchsublocationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bobranchsublocations

}



