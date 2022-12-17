import { hrmskramasterService } from './../../../service/hrmskramaster.service';
import { hrmskramaster } from './../../../model/hrmskramaster.model';
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
import { hrmskpimaster } from './../../../model/hrmskpimaster.model';
import { hrmskpimasterComponent } from './../../../pages/forms/hrmskpimaster/hrmskpimaster.component';
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
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

@Component({
selector: 'app-hrmskramaster',
templateUrl: './hrmskramaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmskramasterComponent implements OnInit {
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
bfilterPopulatehrmskramasters:boolean=false;
bfilterPopulatehrmskpimasters:boolean=false;
@ViewChild('tblhrmskpimasterssource',{static:false}) tblhrmskpimasterssource: Ng2SmartTableComponent;
 hrmskramasterForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;
SESSIONUSERID:any;//current user
hrmskramastershowOption:boolean;
hrmskpimastershowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmskpimastersvisiblelist:any;
hrmskpimastershidelist:any;

DeletedhrmskpimasterIDs: string="";
hrmskpimastersID: string = "1";
hrmskpimastersselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmskramasterservice: hrmskramasterService,
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
this.hrmskramasterForm  = this.fb.group({
pk:[null],
ImageName: [null],
kraid: [null],
kraname: [null],
kraweightagepercent: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmskramasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmskramasterForm.dirty && this.hrmskramasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.kraid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.kraid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.kraid && pkDetail) {
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
let hrmskramasterid = null;

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
this.formid=hrmskramasterid;
//this.sharedService.alert(hrmskramasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmskpimastersTableConfig();
  setTimeout(() => {
  this.SethrmskpimastersTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.hrmskramasterservice.gethrmskramastersList().then(res => {
      this.pkList = res as hrmskramaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.kraname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.kraname;

//setting the flag that the screen is not touched 
this.hrmskramasterForm.markAsUntouched();
this.hrmskramasterForm.markAsPristine();
}



resetForm() {
if (this.hrmskramasterForm != null)
this.hrmskramasterForm.reset();
this.hrmskramasterForm.patchValue({
});
setTimeout(() => {
this.hrmskramasterservice.hrmskpimasters=[];
this.hrmskpimastersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let kraid = this.hrmskramasterForm.get('kraid').value;
        if(kraid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmskramasterservice.deletehrmskramaster(kraid).then(res =>
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
    this.hrmskramasterForm.patchValue({
        kraid: null
    });
    if(this.hrmskramasterservice.formData.kraid!=null)this.hrmskramasterservice.formData.kraid=null;
for (let i=0;i<this.hrmskramasterservice.hrmskpimasters.length;i++) {
this.hrmskramasterservice.hrmskpimasters[i].kpiid=null;
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
this.hrmskramasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmskramasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmskramasterForm.controls[key]!=undefined)
{
this.hrmskramasterForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.hrmskramasterservice.formData.kraname!=null )
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
attachmentuploader(e:any) { 
for (let i = 0; i < e.files.length; i++) {
this.fileattachmentlist.push(e.files[i]);
let max=0;
let attachmentobj =null;
if(this.attachmentfieldjson==null)this.attachmentfieldjson=[];
max=Array.of(this.attachmentfieldjson).length;attachmentobj =new KeyValuePair((this.attachmentfieldjson.length + 1+ max).toString(),e.files[i].name);
this.attachmentfieldjson.push(attachmentobj);
max=0;
if(this.attachmentlist!=null)max=Array.of(this.attachmentlist).length;  attachmentobj =new KeyValuePair((this.attachmentlist.length + 1+ max).toString(),e.files[i].name);
this.attachmentlist.push(attachmentobj);
}}
  


edithrmskramasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmskramasterservice.gethrmskramastersByEID(pkcol).then(res => {

this.hrmskramasterservice.formData=res.hrmskramaster;
let formproperty=res.hrmskramaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmskramaster.pkcol;
this.formid=res.hrmskramaster.kraid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmskramaster.kraid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmskramasterForm.patchValue({
kraid: res.hrmskramaster.kraid,
kraname: res.hrmskramaster.kraname,
kraweightagepercent: res.hrmskramaster.kraweightagepercent,
attachment: JSON.parse(res.hrmskramaster.attachment),
status: res.hrmskramaster.status,
statusdesc: res.hrmskramaster.statusdesc,
});
this.hrmskpimastersvisiblelist=res.hrmskpimastersvisiblelist;
if(this.hrmskramasterForm.get('attachment').value!=null && this.hrmskramasterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmskramasterForm.get('attachment').value);
//Child Tables if any
this.hrmskramasterservice.hrmskpimasters = res.hrmskpimasters;
this.SethrmskpimastersTableConfig();
this.hrmskpimastersLoadTable();
  setTimeout(() => {
  this.SethrmskpimastersTableddConfig();
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
  for (let key in this.hrmskramasterForm.controls) {
    if (this.hrmskramasterForm.controls[key] != null) {
if(false)
{
if(this.hrmskramasterservice.formData!=null && this.hrmskramasterservice.formData[key]!=null  && this.hrmskramasterservice.formData[key]!='[]' && this.hrmskramasterservice.formData[key]!=undefined && this.hrmskramasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmskramasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmskramasterservice.formData!=null && this.hrmskramasterservice.formData[key]!=null   && this.hrmskramasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmskramasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmskramasterservice.formData!=null && this.hrmskramasterservice.formData[key]!=null   && this.hrmskramasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmskramasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmskramasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmskramasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmskramasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmskramasterForm.value;
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
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

private hrmskramastertoggleOption(){
this.hrmskramastershowOption = this.hrmskramastershowOption === true ? false : true;
}

private hrmskpimastertoggleOption(){
this.hrmskpimastershowOption = this.hrmskpimastershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmskramasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmskramasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmskramasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmskramasterservice.formData=this.hrmskramasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmskramasterForm.controls[key] != null)
    {
        this.hrmskramasterservice.formData[key] = this.hrmskramasterForm.controls[key].value;
    }
}
}
}
this.hrmskramasterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.hrmskramasterservice.formData.DeletedhrmskpimasterIDs = this.DeletedhrmskpimasterIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmskramasterservice.formData);
this.hrmskramasterservice.formData=this.hrmskramasterForm.value;
this.hrmskramasterservice.saveOrUpdatehrmskramasters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.hrmskpimasterssource.data)
{
    for (let i = 0; i < this.hrmskpimasterssource.data.length; i++)
    {
        if (this.hrmskpimasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmskpimasterssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmskramaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmskramasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmskramaster);
}
else
{
this.FillData(res);
}
}
this.hrmskramasterForm.markAsUntouched();
this.hrmskramasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdithrmskpimaster(event:any,kpiid:any, kraid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmskpimasterComponent, 
{
data:  {  showview:false,save:false,event,kpiid, kraid,visiblelist:this.hrmskpimastersvisiblelist,  hidelist:this.hrmskpimastershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmskpimasterssource.add(res);
this.hrmskpimasterssource.refresh();
}
else
{
this.hrmskpimasterssource.update(event.data, res);
}
}
});
}

onDeletehrmskpimaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmskpimasterIDs += childID + ",";
this.hrmskramasterservice.hrmskpimasters.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmskpimasters
hrmskpimasterssettings:any;
hrmskpimasterssource: any;

showhrmskpimastersCheckbox()
{
debugger;
if(this.tblhrmskpimasterssource.settings['selectMode']== 'multi')this.tblhrmskpimasterssource.settings['selectMode']= 'single';
else
this.tblhrmskpimasterssource.settings['selectMode']= 'multi';
this.tblhrmskpimasterssource.initGrid();
}
deletehrmskpimastersAll()
{
this.tblhrmskpimasterssource.settings['selectMode'] = 'single';
}
showhrmskpimastersFilter()
{
  setTimeout(() => {
  this.SethrmskpimastersTableddConfig();
  });
      if(this.tblhrmskpimasterssource.settings!=null)this.tblhrmskpimasterssource.settings['hideSubHeader'] =!this.tblhrmskpimasterssource.settings['hideSubHeader'];
this.tblhrmskpimasterssource.initGrid();
}
showhrmskpimastersInActive()
{
}
enablehrmskpimastersInActive()
{
}
async SethrmskpimastersTableddConfig()
{
if(!this.bfilterPopulatehrmskpimasters){
}
this.bfilterPopulatehrmskpimasters=true;
}
async hrmskpimastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmskpimastersTableConfig()
{
this.hrmskpimasterssettings = {
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
kpidescription: {
title: 'K P I Description',
type: '',
filter:true,
},
weightagepercent: {
title: 'Weightage Percent',
type: 'number',
filter:true,
},
expectedvalue: {
title: 'Expected Value',
type: 'number',
filter:true,
},
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmskpimastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmskpimastersID)>=0)
{
this.hrmskpimasterssource=new LocalDataSource();
this.hrmskpimasterssource.load(this.hrmskramasterservice.hrmskpimasters as  any as LocalDataSource);
this.hrmskpimasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmskpimastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmskramasterservice.hrmskpimasters.length == 0)
{
    this.tblhrmskpimasterssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmskpimaster();
    this.hrmskramasterservice.hrmskpimasters.push(obj);
    this.hrmskpimasterssource.refresh();
    if ((this.hrmskramasterservice.hrmskpimasters.length / this.hrmskpimasterssource.getPaging().perPage).toFixed(0) + 1 != this.hrmskpimasterssource.getPaging().page)
    {
        this.hrmskpimasterssource.setPage((this.hrmskramasterservice.hrmskpimasters.length / this.hrmskpimasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmskpimasterssource.grid.edit(this.tblhrmskpimasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmskpimasterssource.data.indexOf(event.data);
this.onDeletehrmskpimaster(event,event.data.kpiid,((this.hrmskpimasterssource.getPaging().page-1) *this.hrmskpimasterssource.getPaging().perPage)+index);
this.hrmskpimasterssource.refresh();
break;
}
}

*/
hrmskpimastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmskpimaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmskpimaster(event,event.data.kpiid,this.formid);
break;
case 'delete':
this.onDeletehrmskpimaster(event,event.data.kpiid,((this.hrmskpimasterssource.getPaging().page-1) *this.hrmskpimasterssource.getPaging().perPage)+event.index);
this.hrmskpimasterssource.refresh();
break;
}
}
hrmskpimastersonDelete(obj) {
let kpiid=obj.data.kpiid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmskramasterservice.deletehrmskramaster(kpiid).then(res=>
this.hrmskpimastersLoadTable()
);
}
}
hrmskpimastersPaging(val)
{
debugger;
this.hrmskpimasterssource.setPaging(1, val, true);
}

handlehrmskpimastersGridSelected(event:any) {
this.hrmskpimastersselectedindex=this.hrmskramasterservice.hrmskpimasters.findIndex(i => i.kpiid === event.data.kpiid);
}
IshrmskpimastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmskpimastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmskpimasters

}



