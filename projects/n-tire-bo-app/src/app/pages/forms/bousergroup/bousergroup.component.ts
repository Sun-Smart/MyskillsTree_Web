import { bousergroupService } from './../../../service/bousergroup.service';
import { bousergroup } from './../../../model/bousergroup.model';
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
import { bousergroupaccess } from './../../../model/bousergroupaccess.model';
//FK services
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from './../../../service/bousermaster.service';
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
import {AppConstants} from '../../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../custom/attachment/attachment.component';
import { customfieldconfigurationService } from './../../../service/customfieldconfiguration.service';
import { customfieldconfiguration } from './../../../model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../dynamic-form-builder/dynamic-form-builder.component';

@Component({
selector: 'app-bousergroup',
templateUrl: './bousergroup.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bousergroupComponent implements OnInit {
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
@ViewChild('customform',{static:false}) customform: DynamicFormBuilderComponent;
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
bfilterPopulatebousergroups:boolean=false;
bfilterPopulatebousergroupaccesses:boolean=false;
@ViewChild('tblbousergroupaccessessource',{static:false}) tblbousergroupaccessessource: Ng2SmartTableComponent;
 bousergroupForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
customfieldjson: any;
customfieldvisible:boolean=true;
readonly AttachmentURL = AppConstants.AttachmentURL;
readonly URL = AppConstants.UploadURL;attachmentlist: any[]=[];fileattachmentlist: any[]=[];
@ViewChild('fileattachment',{static:false}) fileattachment: AttachmentComponent;
attachmentfieldjson: any[]=[];
attachmentvisible:boolean=true;
SESSIONUSERID:any;//current user
sessiondata:any;



bousergroupaccessesvisiblelist:any;
bousergroupaccesseshidelist:any;

DeletedbousergroupaccessIDs: string="";
bousergroupaccessesID: string = "1";
bousergroupaccessesselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bousergroupservice: bousergroupService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private customfieldservice: customfieldconfigurationService,
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
this.bousergroupForm  = this.fb.group({pk:[null],ImageName: [null],
usergroupid: [null],
groupname: [null],
notes: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bousergroupForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bousergroupForm.dirty && this.bousergroupForm.touched ) {
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
????let??pos??=??this.pkList.map(function(e:any)??{??return e.usergroupid.toString();??}).indexOf(this.formid.toString());
????if(pos>0)??this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
????debugger;
let??pos??=??this.pkList.map(function(e:any)??{??return??e.usergroupid.toString();??}).indexOf(this.formid.toString());
????if(pos>=0??&&??pos!=this.pkList.length)??this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.usergroupid && pkDetail) {
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
let bousergroupid = null;

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
this.formid=bousergroupid;
//this.sharedService.alert(bousergroupid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbousergroupaccessesTableConfig();
  setTimeout(() => {
  this.SetbousergroupaccessesTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.bousergroupservice.getbousergroupsList().then(res => {
      this.pkList = res as bousergroup[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.groupname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.groupname;

//setting the flag that the screen is not touched 
this.bousergroupForm.markAsUntouched();
this.bousergroupForm.markAsPristine();
}



resetForm() {
if (this.bousergroupForm != null)
this.bousergroupForm.reset();
this.bousergroupForm.patchValue({
});
setTimeout(() => {
this.bousergroupservice.bousergroupaccesses=[];
this.bousergroupservice.Insertbousergroupaccesses=[];
this.bousergroupaccessesLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let usergroupid = this.bousergroupForm.get('usergroupid').value;
        if(usergroupid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bousergroupservice.deletebousergroup(usergroupid).then(res =>
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
    this.bousergroupForm.patchValue({
        usergroupid: null
    });
    if(this.bousergroupservice.formData.usergroupid!=null)this.bousergroupservice.formData.usergroupid=null;
for (let i=0;i<this.bousergroupservice.bousergroupaccesses.length;i++) {
this.bousergroupservice.bousergroupaccesses[i].accessid=null;
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
this.bousergroupForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bousergroupForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bousergroupForm.controls[key]!=undefined)this.bousergroupForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("bousergroups",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


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
????


async PopulateScreen(pkcol:any){
this.bousergroupservice.getbousergroupsByEID(pkcol).then(res => {

this.bousergroupservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bousergroup.usergroupid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bousergroup.usergroupid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bousergroupForm.patchValue({
usergroupid: res.bousergroup.usergroupid,
groupname: res.bousergroup.groupname,
notes: res.bousergroup.notes,
customfield: res.bousergroup.customfield,
attachment: res.bousergroup.attachment,
status: res.bousergroup.status,
statusdesc: res.bousergroup.statusdesc,
});
this.bousergroupaccessesvisiblelist=res.bousergroupaccessesvisiblelist;
if(this.bousergroupForm.get('customfield').value!=null && this.bousergroupForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.bousergroupForm.get('customfield').value);
this.FillCustomField();
if(this.bousergroupForm.get('attachment').value!=null && this.bousergroupForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(JSON.parse(this.bousergroupForm.get('attachment').value));
//Child Tables if any
this.bousergroupservice.bousergroupaccesses = res.bousergroupaccesses;
this.SetbousergroupaccessesTableConfig();
this.bousergroupaccessesLoadTable();
  setTimeout(() => {
  this.SetbousergroupaccessesTableddConfig();
  });
this.bousergroupservice.Insertbousergroupaccesses=[];
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
  for (let key in this.bousergroupForm.controls) {
    if (this.bousergroupForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bousergroupForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bousergroupForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.bousergroupForm.value;
obj.customfield=JSON.stringify(customfields);
obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
obj.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(obj);
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bousergroupForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bousergroupForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bousergroupForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bousergroupservice.formData=this.bousergroupForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bousergroupForm.controls[key] != null)
    {
        this.bousergroupservice.formData[key] = this.bousergroupForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
this.bousergroupservice.formData.customfield=JSON.stringify(customfields);
this.bousergroupservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.bousergroupservice.formData.DeletedbousergroupaccessIDs = this.DeletedbousergroupaccessIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.bousergroupservice.formData);
this.bousergroupservice.formData=this.bousergroupForm.value;
this.bousergroupservice.saveOrUpdatebousergroups().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.bousergroupaccessessource.data)
{
    for (let i = 0; i < this.bousergroupaccessessource.data.length; i++)
    {
        if (this.bousergroupaccessessource.data[i].fileattachmentlist)await this.sharedService.upload(this.bousergroupaccessessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bousergroup);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bousergroupservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bousergroup);
}
else
{
this.FillData(res);
}
}
this.bousergroupForm.markAsUntouched();
this.bousergroupForm.markAsPristine();
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
//start of Grid Codes bousergroupaccesses
onCustombousergroupaccessesAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bousermasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
          header: 'bousermaster details'
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
bousergroupaccessessettings:any;
bousergroupaccessessource: any;

showbousergroupaccessesCheckbox()
{
debugger;
if(this.tblbousergroupaccessessource.settings['selectMode']== 'multi')this.tblbousergroupaccessessource.settings['selectMode']= 'single';
else
this.tblbousergroupaccessessource.settings['selectMode']= 'multi';
this.tblbousergroupaccessessource.initGrid();
}
deletebousergroupaccessesAll()
{
this.tblbousergroupaccessessource.settings['selectMode'] = 'single';
}
showbousergroupaccessesFilter()
{
  setTimeout(() => {
  this.SetbousergroupaccessesTableddConfig();
  });
      if(this.tblbousergroupaccessessource.settings!=null)this.tblbousergroupaccessessource.settings['hideSubHeader'] =!this.tblbousergroupaccessessource.settings['hideSubHeader'];
this.tblbousergroupaccessessource.initGrid();
}
showbousergroupaccessesInActive()
{
}
enablebousergroupaccessesInActive()
{
}
async SetbousergroupaccessesTableddConfig()
{
if(!this.bfilterPopulatebousergroupaccesses){
}
this.bfilterPopulatebousergroupaccesses=true;
}
async bousergroupaccessesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbousergroupaccessesTableConfig()
{
this.bousergroupaccessessettings = {
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
accessid: {
title: 'Access',
type: '',
},
userid: {
title: 'User',
type: '',
},
usercode: {
title: 'Usercode',
type: '',
},
username: {
title: 'Username',
type: '',
},
},
};
}
bousergroupaccessesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bousergroupaccessesID)>=0)
{
this.bousergroupaccessessource=new LocalDataSource();
this.bousergroupaccessessource.load(this.bousergroupservice.bousergroupaccesses as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblbousergroupaccessessource!=null)
{this.tblbousergroupaccessessource.grid.getRows().forEach((row:any) => {
if(row.data.accessid!=null && row.data.accessid!="")
{
this.bousergroupservice.Insertbousergroupaccesses.push(row.data);
this.tblbousergroupaccessessource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
bousergroupaccessesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bousergroupservice.bousergroupaccesses.length == 0)
{
    this.tblbousergroupaccessessource.grid.createFormShown = true;
}
else
{
    let obj = new bousergroupaccess();
    this.bousergroupservice.bousergroupaccesses.push(obj);
    this.bousergroupaccessessource.refresh();
    if ((this.bousergroupservice.bousergroupaccesses.length / this.bousergroupaccessessource.getPaging().perPage).toFixed(0) + 1 != this.bousergroupaccessessource.getPaging().page)
    {
        this.bousergroupaccessessource.setPage((this.bousergroupservice.bousergroupaccesses.length / this.bousergroupaccessessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbousergroupaccessessource.grid.edit(this.tblbousergroupaccessessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bousergroupaccessessource.data.indexOf(event.data);
this.onDeletebousergroupaccess(event,event.data.accessid,((this.bousergroupaccessessource.getPaging().page-1) *this.bousergroupaccessessource.getPaging().perPage)+index);
this.bousergroupaccessessource.refresh();
break;
}
}

*/
bousergroupaccessesPaging(val)
{
debugger;
this.bousergroupaccessessource.setPaging(1, val, true);
}

handlebousergroupaccessesGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.accessid==null || event.data.accessid=="")
{
var obj={usergroupid:this.formid,userid:event.data.userid}
this.bousergroupservice.Insertbousergroupaccesses.push(obj as any);
}
else
{
var deletedids=this.DeletedbousergroupaccessIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.accessid)
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
if(event.data.accessid!=null && event.data.accessid!="")this.DeletedbousergroupaccessIDs += event.data.accessid + ","; 
}
}
IsbousergroupaccessesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bousergroupaccessesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bousergroupaccesses

}



