import { crmindexmasterService } from './../../../service/crmindexmaster.service';
import { crmindexmaster } from './../../../model/crmindexmaster.model';
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
import { crmindexdetail } from './../../../model/crmindexdetail.model';
import { crmindexdetailComponent } from './../../../pages/forms/crmindexdetail/crmindexdetail.component';
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
selector: 'app-crmindexmaster',
templateUrl: './crmindexmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class crmindexmasterComponent implements OnInit {
hidelist:any=[];
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
bfilterPopulatecrmindexmasters:boolean=false;
datacrmindexmastersvaluenode3:any=[];
bfilterPopulatecrmindexdetails:boolean=false;
@ViewChild('tblcrmindexdetailssource',{static:false}) tblcrmindexdetailssource: Ng2SmartTableComponent;
 crmindexmasterForm: FormGroup;
valuenodeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
crmindexmastershowOption:boolean;
crmindexdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



crmindexdetailsvisiblelist:any;
crmindexdetailshidelist:any;

DeletedcrmindexdetailIDs: string="";
crmindexdetailsID: string = "1";
crmindexdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private crmindexmasterservice: crmindexmasterService,
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
this.crmindexmasterForm  = this.fb.group({
pk:[null],
indexid: [null],
indexname: [null],
valuenode: [null],
valuenodedesc: [null],
parentindex: [null],
value: [null],
mandatory: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.crmindexmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.crmindexmasterForm.dirty && this.crmindexmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.indexid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.indexid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.indexid && pkDetail) {
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
this.viewhtml=this.sessionService.getViewHtml();

debugger;
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
let crmindexmasterid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
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
this.formid=crmindexmasterid;
//this.sharedService.alert(crmindexmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcrmindexdetailsTableConfig();
  setTimeout(() => {
  this.SetcrmindexdetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("valuenode").then(res => this.valuenodeList = res as boconfigvalue[]);

//autocomplete
    this.crmindexmasterservice.getcrmindexmastersList().then(res => {
      this.pkList = res as crmindexmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.indexname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.indexname;

//setting the flag that the screen is not touched 
this.crmindexmasterForm.markAsUntouched();
this.crmindexmasterForm.markAsPristine();
}



resetForm() {
if (this.crmindexmasterForm != null)
this.crmindexmasterForm.reset();
this.crmindexmasterForm.patchValue({
});
setTimeout(() => {
this.crmindexmasterservice.crmindexdetails=[];
this.crmindexdetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let indexid = this.crmindexmasterForm.get('indexid').value;
        if(indexid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.crmindexmasterservice.deletecrmindexmaster(indexid).then(res =>
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
    this.crmindexmasterForm.patchValue({
        indexid: null
    });
    if(this.crmindexmasterservice.formData.indexid!=null)this.crmindexmasterservice.formData.indexid=null;
for (let i=0;i<this.crmindexmasterservice.crmindexdetails.length;i++) {
this.crmindexmasterservice.crmindexdetails[i].indexdetailid=null;
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
this.crmindexmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.crmindexmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.crmindexmasterForm.controls[key]!=undefined)
{
this.crmindexmasterForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
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
if(this.maindata==undefined || this.maindata.save==true  || this.crmindexmasterservice.formData.indexname!=null )
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
if(this.pkcol == null || (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
valuenodeonChange(evt:any){
let e=this.f.valuenode.value as any;
this.crmindexmasterForm.patchValue({valuenodedesc:evt.options[evt.options.selectedIndex].text});
}

editcrmindexmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.crmindexmasterservice.getcrmindexmastersByEID(pkcol).then(res => {

this.crmindexmasterservice.formData=res.crmindexmaster;
let formproperty=res.crmindexmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.crmindexmaster.pkcol;
this.formid=res.crmindexmaster.indexid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.crmindexmaster.indexid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.crmindexmasterForm.patchValue({
indexid: res.crmindexmaster.indexid,
indexname: res.crmindexmaster.indexname,
valuenode: res.crmindexmaster.valuenode,
valuenodedesc: res.crmindexmaster.valuenodedesc,
parentindex: res.crmindexmaster.parentindex,
value: res.crmindexmaster.value,
mandatory: res.crmindexmaster.mandatory,
status: res.crmindexmaster.status,
statusdesc: res.crmindexmaster.statusdesc,
});
this.crmindexdetailsvisiblelist=res.crmindexdetailsvisiblelist;
//Child Tables if any
this.crmindexmasterservice.crmindexdetails = res.crmindexdetails;
this.SetcrmindexdetailsTableConfig();
this.crmindexdetailsLoadTable();
  setTimeout(() => {
  this.SetcrmindexdetailsTableddConfig();
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
  for (let key in this.crmindexmasterForm.controls) {
    if (this.crmindexmasterForm.controls[key] != null) {
if(false)
{
if(this.crmindexmasterservice.formData!=null && this.crmindexmasterservice.formData[key]!=null  && this.crmindexmasterservice.formData[key]!='[]' && this.crmindexmasterservice.formData[key]!=undefined && this.crmindexmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.crmindexmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.crmindexmasterservice.formData!=null && this.crmindexmasterservice.formData[key]!=null   && this.crmindexmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.crmindexmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.crmindexmasterservice.formData!=null && this.crmindexmasterservice.formData[key]!=null   && this.crmindexmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.crmindexmasterservice.formData[key]+"'><div class='progress__number'>"+this.crmindexmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.crmindexmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.crmindexmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.crmindexmasterForm.value;
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

private crmindexmastertoggleOption(){
this.crmindexmastershowOption = this.crmindexmastershowOption === true ? false : true;
}

private crmindexdetailtoggleOption(){
this.crmindexdetailshowOption = this.crmindexdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.crmindexmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.crmindexmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.crmindexmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.crmindexmasterservice.formData=this.crmindexmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.crmindexmasterForm.controls[key] != null)
    {
        this.crmindexmasterservice.formData[key] = this.crmindexmasterForm.controls[key].value;
    }
}
}
}
this.crmindexmasterservice.formData.DeletedcrmindexdetailIDs = this.DeletedcrmindexdetailIDs;
console.log(this.crmindexmasterservice.formData);
this.crmindexmasterservice.formData=this.crmindexmasterForm.value;
this.crmindexmasterservice.saveOrUpdatecrmindexmasters().subscribe(
async res => {
if (this.crmindexdetailssource.data)
{
    for (let i = 0; i < this.crmindexdetailssource.data.length; i++)
    {
        if (this.crmindexdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.crmindexdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).crmindexmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.crmindexmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).crmindexmaster);
}
else
{
this.FillData(res);
}
}
this.crmindexmasterForm.markAsUntouched();
this.crmindexmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcrmindexdetail(event:any,indexdetailid:any, indexid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(crmindexdetailComponent, 
{
data:  {  showview:false,save:false,event,indexdetailid, indexid,visiblelist:this.crmindexdetailsvisiblelist,  hidelist:this.crmindexdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.crmindexdetailssource.add(res);
this.crmindexdetailssource.refresh();
}
else
{
this.crmindexdetailssource.update(event.data, res);
}
}
});
}

onDeletecrmindexdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcrmindexdetailIDs += childID + ",";
this.crmindexmasterservice.crmindexdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes crmindexdetails
crmindexdetailssettings:any;
crmindexdetailssource: any;

showcrmindexdetailsCheckbox()
{
debugger;
if(this.tblcrmindexdetailssource.settings['selectMode']== 'multi')this.tblcrmindexdetailssource.settings['selectMode']= 'single';
else
this.tblcrmindexdetailssource.settings['selectMode']= 'multi';
this.tblcrmindexdetailssource.initGrid();
}
deletecrmindexdetailsAll()
{
this.tblcrmindexdetailssource.settings['selectMode'] = 'single';
}
showcrmindexdetailsFilter()
{
  setTimeout(() => {
  this.SetcrmindexdetailsTableddConfig();
  });
      if(this.tblcrmindexdetailssource.settings!=null)this.tblcrmindexdetailssource.settings['hideSubHeader'] =!this.tblcrmindexdetailssource.settings['hideSubHeader'];
this.tblcrmindexdetailssource.initGrid();
}
showcrmindexdetailsInActive()
{
}
enablecrmindexdetailsInActive()
{
}
async SetcrmindexdetailsTableddConfig()
{
if(!this.bfilterPopulatecrmindexdetails){
}
this.bfilterPopulatecrmindexdetails=true;
}
async crmindexdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcrmindexdetailsTableConfig()
{
this.crmindexdetailssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
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
value: {
title: 'Value',
type: '',
filter:true,
},
parentindexdetail: {
title: 'Parent Index Detail',
type: 'number',
filter:true,
},
},
};
}
crmindexdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.crmindexdetailsID)>=0)
{
this.crmindexdetailssource=new LocalDataSource();
this.crmindexdetailssource.load(this.crmindexmasterservice.crmindexdetails as  any as LocalDataSource);
this.crmindexdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
crmindexdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.crmindexmasterservice.crmindexdetails.length == 0)
{
    this.tblcrmindexdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new crmindexdetail();
    this.crmindexmasterservice.crmindexdetails.push(obj);
    this.crmindexdetailssource.refresh();
    if ((this.crmindexmasterservice.crmindexdetails.length / this.crmindexdetailssource.getPaging().perPage).toFixed(0) + 1 != this.crmindexdetailssource.getPaging().page)
    {
        this.crmindexdetailssource.setPage((this.crmindexmasterservice.crmindexdetails.length / this.crmindexdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcrmindexdetailssource.grid.edit(this.tblcrmindexdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.crmindexdetailssource.data.indexOf(event.data);
this.onDeletecrmindexdetail(event,event.data.indexdetailid,((this.crmindexdetailssource.getPaging().page-1) *this.crmindexdetailssource.getPaging().perPage)+index);
this.crmindexdetailssource.refresh();
break;
}
}

*/
crmindexdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcrmindexdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcrmindexdetail(event,event.data.indexdetailid,this.formid);
break;
case 'delete':
this.onDeletecrmindexdetail(event,event.data.indexdetailid,((this.crmindexdetailssource.getPaging().page-1) *this.crmindexdetailssource.getPaging().perPage)+event.index);
this.crmindexdetailssource.refresh();
break;
}
}
crmindexdetailsonDelete(obj) {
let indexdetailid=obj.data.indexdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.crmindexmasterservice.deletecrmindexmaster(indexdetailid).then(res=>
this.crmindexdetailsLoadTable()
);
}
}
crmindexdetailsPaging(val)
{
debugger;
this.crmindexdetailssource.setPaging(1, val, true);
}

handlecrmindexdetailsGridSelected(event:any) {
this.crmindexdetailsselectedindex=this.crmindexmasterservice.crmindexdetails.findIndex(i => i.indexdetailid === event.data.indexdetailid);
}
IscrmindexdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.crmindexdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes crmindexdetails

}



