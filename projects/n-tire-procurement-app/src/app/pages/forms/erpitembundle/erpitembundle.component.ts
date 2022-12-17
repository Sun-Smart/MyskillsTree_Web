import { erpitembundleService } from './../../../service/erpitembundle.service';
import { erpitembundle } from './../../../model/erpitembundle.model';
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
import { erpitembundledetail } from './../../../model/erpitembundledetail.model';
import { erpitembundledetailComponent } from './../../../pages/forms/erpitembundledetail/erpitembundledetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
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
selector: 'app-erpitembundle',
templateUrl: './erpitembundle.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpitembundleComponent implements OnInit {
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
bfilterPopulateerpitembundles:boolean=false;
dataerpitembundledetailsuom3:any=[];
dataerpitembundledetailsitemid3:any=[];
dataerpitembundledetailsbundleid3:any=[];
bfilterPopulateerpitembundledetails:boolean=false;
@ViewChild('tblerpitembundledetailssource',{static:false}) tblerpitembundledetailssource: Ng2SmartTableComponent;
 erpitembundleForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpitembundleshowOption:boolean;
erpitembundledetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpitembundledetailsvisiblelist:any;
erpitembundledetailshidelist:any;

DeletederpitembundledetailIDs: string="";
erpitembundledetailsID: string = "1";
erpitembundledetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpitembundleservice: erpitembundleService,
private erpitemmasterservice: erpitemmasterService,
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
this.erpitembundleForm  = this.fb.group({
pk:[null],
bundleid: [null],
code: [null, Validators.required],
description: [null, Validators.required],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpitembundleForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpitembundleForm.dirty && this.erpitembundleForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
descriptionexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.description.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].bundleid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Description value exists in the database.Do you want to display the record ? "))
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
  let pos = this.pkList.map(function(e:any) { return e.bundleid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.bundleid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.bundleid && pkDetail) {
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
let erpitembundleid = null;

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
this.formid=erpitembundleid;
//this.sharedService.alert(erpitembundleid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpitembundledetailsTableConfig();
  setTimeout(() => {
  this.SeterpitembundledetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.erpitembundleservice.geterpitembundlesList().then(res => {
      this.pkList = res as erpitembundle[];
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
this.erpitembundleForm.markAsUntouched();
this.erpitembundleForm.markAsPristine();
}



resetForm() {
if (this.erpitembundleForm != null)
this.erpitembundleForm.reset();
this.erpitembundleForm.patchValue({
});
setTimeout(() => {
this.erpitembundleservice.erpitembundledetails=[];
this.erpitembundledetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let bundleid = this.erpitembundleForm.get('bundleid').value;
        if(bundleid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpitembundleservice.deleteerpitembundle(bundleid).then(res =>
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
    this.erpitembundleForm.patchValue({
        bundleid: null
    });
    if(this.erpitembundleservice.formData.bundleid!=null)this.erpitembundleservice.formData.bundleid=null;
for (let i=0;i<this.erpitembundleservice.erpitembundledetails.length;i++) {
this.erpitembundleservice.erpitembundledetails[i].bundledetailid=null;
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
this.erpitembundleForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpitembundleForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpitembundleForm.controls[key]!=undefined)
{
this.erpitembundleForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  )
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

editerpitembundles() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpitembundleservice.geterpitembundlesByEID(pkcol).then(res => {

this.erpitembundleservice.formData=res.erpitembundle;
let formproperty=res.erpitembundle.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpitembundle.pkcol;
this.formid=res.erpitembundle.bundleid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpitembundle.bundleid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpitembundleForm.patchValue({
bundleid: res.erpitembundle.bundleid,
code: res.erpitembundle.code,
description: res.erpitembundle.description,
status: res.erpitembundle.status,
statusdesc: res.erpitembundle.statusdesc,
});
this.erpitembundledetailsvisiblelist=res.erpitembundledetailsvisiblelist;
//Child Tables if any
this.erpitembundleservice.erpitembundledetails = res.erpitembundledetails;
this.SeterpitembundledetailsTableConfig();
this.erpitembundledetailsLoadTable();
  setTimeout(() => {
  this.SeterpitembundledetailsTableddConfig();
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
  for (let key in this.erpitembundleForm.controls) {
    if (this.erpitembundleForm.controls[key] != null) {
if(false)
{
if(this.erpitembundleservice.formData!=null && this.erpitembundleservice.formData[key]!=null  && this.erpitembundleservice.formData[key]!='[]' && this.erpitembundleservice.formData[key]!=undefined && this.erpitembundleservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpitembundleservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpitembundleservice.formData!=null && this.erpitembundleservice.formData[key]!=null   && this.erpitembundleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpitembundleservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpitembundleservice.formData!=null && this.erpitembundleservice.formData[key]!=null   && this.erpitembundleservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpitembundleservice.formData[key]+"'><div class='progress__number'>"+this.erpitembundleservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpitembundleForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpitembundleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpitembundleForm.value;
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

private erpitembundletoggleOption(){
this.erpitembundleshowOption = this.erpitembundleshowOption === true ? false : true;
}

private erpitembundledetailtoggleOption(){
this.erpitembundledetailshowOption = this.erpitembundledetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpitembundleForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpitembundleForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpitembundleForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpitembundleservice.formData=this.erpitembundleForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpitembundleForm.controls[key] != null)
    {
        this.erpitembundleservice.formData[key] = this.erpitembundleForm.controls[key].value;
    }
}
}
}
this.erpitembundleservice.formData.DeletederpitembundledetailIDs = this.DeletederpitembundledetailIDs;
console.log(this.erpitembundleservice.formData);
this.erpitembundleservice.formData=this.erpitembundleForm.value;
this.erpitembundleservice.saveOrUpdateerpitembundles().subscribe(
async res => {
if (this.erpitembundledetailssource.data)
{
    for (let i = 0; i < this.erpitembundledetailssource.data.length; i++)
    {
        if (this.erpitembundledetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpitembundledetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpitembundle);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpitembundleservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpitembundle);
}
else
{
this.FillData(res);
}
}
this.erpitembundleForm.markAsUntouched();
this.erpitembundleForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditerpitembundledetail(event:any,bundledetailid:any, bundleid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpitembundledetailComponent, 
{
data:  {  showview:false,save:false,event,bundledetailid, bundleid,visiblelist:this.erpitembundledetailsvisiblelist,  hidelist:this.erpitembundledetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpitembundledetailssource.add(res);
this.erpitembundledetailssource.refresh();
}
else
{
this.erpitembundledetailssource.update(event.data, res);
}
}
});
}

onDeleteerpitembundledetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpitembundledetailIDs += childID + ",";
this.erpitembundleservice.erpitembundledetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpitembundledetails
erpitembundledetailssettings:any;
erpitembundledetailssource: any;

showerpitembundledetailsCheckbox()
{
debugger;
if(this.tblerpitembundledetailssource.settings['selectMode']== 'multi')this.tblerpitembundledetailssource.settings['selectMode']= 'single';
else
this.tblerpitembundledetailssource.settings['selectMode']= 'multi';
this.tblerpitembundledetailssource.initGrid();
}
deleteerpitembundledetailsAll()
{
this.tblerpitembundledetailssource.settings['selectMode'] = 'single';
}
showerpitembundledetailsFilter()
{
  setTimeout(() => {
  this.SeterpitembundledetailsTableddConfig();
  });
      if(this.tblerpitembundledetailssource.settings!=null)this.tblerpitembundledetailssource.settings['hideSubHeader'] =!this.tblerpitembundledetailssource.settings['hideSubHeader'];
this.tblerpitembundledetailssource.initGrid();
}
showerpitembundledetailsInActive()
{
}
enableerpitembundledetailsInActive()
{
}
async SeterpitembundledetailsTableddConfig()
{
if(!this.bfilterPopulateerpitembundledetails){
}
this.bfilterPopulateerpitembundledetails=true;
}
async erpitembundledetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpitembundledetailsTableConfig()
{
this.erpitembundledetailssettings = {
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
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
description: {
title: 'Description',
type: '',
filter:true,
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:true,
},
},
};
}
erpitembundledetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpitembundledetailsID)>=0)
{
this.erpitembundledetailssource=new LocalDataSource();
this.erpitembundledetailssource.load(this.erpitembundleservice.erpitembundledetails as  any as LocalDataSource);
this.erpitembundledetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpitembundledetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpitembundleservice.erpitembundledetails.length == 0)
{
    this.tblerpitembundledetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpitembundledetail();
    this.erpitembundleservice.erpitembundledetails.push(obj);
    this.erpitembundledetailssource.refresh();
    if ((this.erpitembundleservice.erpitembundledetails.length / this.erpitembundledetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpitembundledetailssource.getPaging().page)
    {
        this.erpitembundledetailssource.setPage((this.erpitembundleservice.erpitembundledetails.length / this.erpitembundledetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpitembundledetailssource.grid.edit(this.tblerpitembundledetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpitembundledetailssource.data.indexOf(event.data);
this.onDeleteerpitembundledetail(event,event.data.bundledetailid,((this.erpitembundledetailssource.getPaging().page-1) *this.erpitembundledetailssource.getPaging().perPage)+index);
this.erpitembundledetailssource.refresh();
break;
}
}

*/
erpitembundledetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpitembundledetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpitembundledetail(event,event.data.bundledetailid,this.formid);
break;
case 'delete':
this.onDeleteerpitembundledetail(event,event.data.bundledetailid,((this.erpitembundledetailssource.getPaging().page-1) *this.erpitembundledetailssource.getPaging().perPage)+event.index);
this.erpitembundledetailssource.refresh();
break;
}
}
erpitembundledetailsonDelete(obj) {
let bundledetailid=obj.data.bundledetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpitembundleservice.deleteerpitembundle(bundledetailid).then(res=>
this.erpitembundledetailsLoadTable()
);
}
}
erpitembundledetailsPaging(val)
{
debugger;
this.erpitembundledetailssource.setPaging(1, val, true);
}

handleerpitembundledetailsGridSelected(event:any) {
this.erpitembundledetailsselectedindex=this.erpitembundleservice.erpitembundledetails.findIndex(i => i.bundledetailid === event.data.bundledetailid);
}
IserpitembundledetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpitembundledetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpitembundledetails

}



