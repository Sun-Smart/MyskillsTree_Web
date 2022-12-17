import { bofactService } from './../../../service/bofact.service';
import { bofact } from './../../../model/bofact.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
import { bonotifier } from './../../../model/bonotifier.model';
import { bonotifierComponent } from './../../../pages/forms/bonotifier/bonotifier.component';
//FK services
import { bousermaster,IbousermasterResponse } from './../../../model/bousermaster.model';
import { bousermasterComponent } from './../../../pages/forms/bousermaster/bousermaster.component';
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
selector: 'app-bofact',
templateUrl: './bofact.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bofactComponent implements OnInit {
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
bfilterPopulatebofacts:boolean=false;
databonotifiersnotifieruserid3:any=[];
bfilterPopulatebonotifiers:boolean=false;
@ViewChild('tblbonotifierssource',{static:false}) tblbonotifierssource: Ng2SmartTableComponent;
 bofactForm: FormGroup;
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
bofactshowOption:boolean;
bonotifiershowOption:boolean;
sessiondata:any;
sourcekey:any;



bonotifiersvisiblelist:any;
bonotifiershidelist:any;

DeletedbonotifierIDs: string="";
bonotifiersID: string = "1";
bonotifiersselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bofactservice: bofactService,
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
this.bofactForm  = this.fb.group({
pk:[null],
ImageName: [null],
factid: [null],
sourcefield: [null],
sourcereference: [null],
notes: [null],
feedback: [null],
customfield: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bofactForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bofactForm.dirty && this.bofactForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.factid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.factid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.factid && pkDetail) {
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
let bofactid = null;

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
this.formid=bofactid;
//this.sharedService.alert(bofactid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbonotifiersTableConfig();
  setTimeout(() => {
  this.SetbonotifiersTableddConfig();
  });

this.FillCustomField();
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.bofactservice.getbofactsList().then(res => {
      this.pkList = res as bofact[];
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
this.bofactForm.markAsUntouched();
this.bofactForm.markAsPristine();
}



resetForm() {
if (this.bofactForm != null)
this.bofactForm.reset();
this.bofactForm.patchValue({
});
setTimeout(() => {
this.bofactservice.bonotifiers=[];
this.bonotifiersLoadTable();
});
this.customfieldservice.reset(document);
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.bofactForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let factid = this.bofactForm.get('factid').value;
        if(factid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bofactservice.deletebofact(factid).then(res =>
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
    this.bofactForm.patchValue({
        factid: null
    });
    if(this.bofactservice.formData.factid!=null)this.bofactservice.formData.factid=null;
for (let i=0;i<this.bofactservice.bonotifiers.length;i++) {
this.bofactservice.bonotifiers[i].notifierid=null;
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
this.bofactForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bofactForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bofactForm.controls[key]!=undefined)
{
this.bofactForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
}
      }
      }
      }
    }
    }
async FillCustomField()
{
return this.customfieldservice.getcustomfieldconfigurationsByTable("bofacts",this.CustomFormName,"","",this.customfieldjson).then(res=>{
this.customfieldservicelist = res;
if(this.customfieldservicelist!=undefined)this.customfieldvisible=(this.customfieldservicelist.fields.length>0)?true:false;
      return res;
});


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
  


editbofacts() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.bofactservice.getbofactsByEID(pkcol).then(res => {

this.bofactservice.formData=res.bofact;
let formproperty=res.bofact.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.bofact.pkcol;
this.formid=res.bofact.factid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bofact.factid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bofactForm.patchValue({
factid: res.bofact.factid,
sourcefield: res.bofact.sourcefield,
sourcereference: res.bofact.sourcereference,
notes: res.bofact.notes,
feedback: res.bofact.feedback,
customfield: res.bofact.customfield,
attachment: JSON.parse(res.bofact.attachment),
status: res.bofact.status,
statusdesc: res.bofact.statusdesc,
});
this.bonotifiersvisiblelist=res.bonotifiersvisiblelist;
if(this.bofactForm.get('customfield').value!=null && this.bofactForm.get('customfield').value!="")this.customfieldjson=JSON.parse(this.bofactForm.get('customfield').value);
this.FillCustomField();
if(this.bofactForm.get('attachment').value!=null && this.bofactForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.bofactForm.get('attachment').value);
//Child Tables if any
this.bofactservice.bonotifiers = res.bonotifiers;
this.SetbonotifiersTableConfig();
this.bonotifiersLoadTable();
  setTimeout(() => {
  this.SetbonotifiersTableddConfig();
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
  for (let key in this.bofactForm.controls) {
    if (this.bofactForm.controls[key] != null) {
if(false)
{
if(this.bofactservice.formData!=null && this.bofactservice.formData[key]!=null  && this.bofactservice.formData[key]!='[]' && this.bofactservice.formData[key]!=undefined && this.bofactservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.bofactservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.bofactservice.formData!=null && this.bofactservice.formData[key]!=null   && this.bofactservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.bofactservice.formData[key]+"></div>");
}
else if(false)
{
if(this.bofactservice.formData!=null && this.bofactservice.formData[key]!=null   && this.bofactservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.bofactservice.formData[key]+"'><div class='progress__number'>"+this.bofactservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bofactForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bofactForm.valid  || (this.customform!=undefined &&  this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var customfields=this.customfieldservice.getCustomValues(document);
var obj=this.bofactForm.value;
if(customfields!=null)obj.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
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

private bofacttoggleOption(){
this.bofactshowOption = this.bofactshowOption === true ? false : true;
}

private bonotifiertoggleOption(){
this.bonotifiershowOption = this.bonotifiershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bofactForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bofactForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bofactForm.valid || (this.customform!=undefined && this.customform.form!=undefined &&  !this.customform.form.valid))
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bofactservice.formData=this.bofactForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bofactForm.controls[key] != null)
    {
        this.bofactservice.formData[key] = this.bofactForm.controls[key].value;
    }
}
}
}
var customfields=this.customfieldservice.getCustomValues(document);
if(customfields!=null)this.bofactservice.formData.customfield=JSON.stringify(customfields);
if(this.fileattachment.getattachmentlist()!=null)this.bofactservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.bofactservice.formData.DeletedbonotifierIDs = this.DeletedbonotifierIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.bofactservice.formData);
this.bofactservice.formData=this.bofactForm.value;
this.bofactservice.saveOrUpdatebofacts().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.bonotifierssource.data)
{
    for (let i = 0; i < this.bonotifierssource.data.length; i++)
    {
        if (this.bonotifierssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bonotifierssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).bofact);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bofactservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).bofact);
}
else
{
this.FillData(res);
}
}
this.bofactForm.markAsUntouched();
this.bofactForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbonotifier(event:any,notifierid:any, factid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bonotifierComponent, 
{
data:  {  showview:false,save:false,event,notifierid, factid,visiblelist:this.bonotifiersvisiblelist,  hidelist:this.bonotifiershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bonotifierssource.add(res);
this.bonotifierssource.refresh();
}
else
{
this.bonotifierssource.update(event.data, res);
}
}
});
}

onDeletebonotifier(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbonotifierIDs += childID + ",";
this.bofactservice.bonotifiers.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bonotifiers
bonotifierssettings:any;
bonotifierssource: any;

showbonotifiersCheckbox()
{
debugger;
if(this.tblbonotifierssource.settings['selectMode']== 'multi')this.tblbonotifierssource.settings['selectMode']= 'single';
else
this.tblbonotifierssource.settings['selectMode']= 'multi';
this.tblbonotifierssource.initGrid();
}
deletebonotifiersAll()
{
this.tblbonotifierssource.settings['selectMode'] = 'single';
}
showbonotifiersFilter()
{
  setTimeout(() => {
  this.SetbonotifiersTableddConfig();
  });
      if(this.tblbonotifierssource.settings!=null)this.tblbonotifierssource.settings['hideSubHeader'] =!this.tblbonotifierssource.settings['hideSubHeader'];
this.tblbonotifierssource.initGrid();
}
showbonotifiersInActive()
{
}
enablebonotifiersInActive()
{
}
async SetbonotifiersTableddConfig()
{
if(!this.bfilterPopulatebonotifiers){
}
this.bfilterPopulatebonotifiers=true;
}
async bonotifiersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbonotifiersTableConfig()
{
this.bonotifierssettings = {
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
notifieruserid: {
title: 'Notifier User',
type: 'number',
filter:true,
},
},
};
}
bonotifiersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bonotifiersID)>=0)
{
this.bonotifierssource=new LocalDataSource();
this.bonotifierssource.load(this.bofactservice.bonotifiers as  any as LocalDataSource);
this.bonotifierssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bonotifiersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bofactservice.bonotifiers.length == 0)
{
    this.tblbonotifierssource.grid.createFormShown = true;
}
else
{
    let obj = new bonotifier();
    this.bofactservice.bonotifiers.push(obj);
    this.bonotifierssource.refresh();
    if ((this.bofactservice.bonotifiers.length / this.bonotifierssource.getPaging().perPage).toFixed(0) + 1 != this.bonotifierssource.getPaging().page)
    {
        this.bonotifierssource.setPage((this.bofactservice.bonotifiers.length / this.bonotifierssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbonotifierssource.grid.edit(this.tblbonotifierssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bonotifierssource.data.indexOf(event.data);
this.onDeletebonotifier(event,event.data.notifierid,((this.bonotifierssource.getPaging().page-1) *this.bonotifierssource.getPaging().perPage)+index);
this.bonotifierssource.refresh();
break;
}
}

*/
bonotifiersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbonotifier(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbonotifier(event,event.data.notifierid,this.formid);
break;
case 'delete':
this.onDeletebonotifier(event,event.data.notifierid,((this.bonotifierssource.getPaging().page-1) *this.bonotifierssource.getPaging().perPage)+event.index);
this.bonotifierssource.refresh();
break;
}
}
bonotifiersonDelete(obj) {
let notifierid=obj.data.notifierid;
if (confirm('Are you sure to delete this record ?')) {
this.bofactservice.deletebofact(notifierid).then(res=>
this.bonotifiersLoadTable()
);
}
}
bonotifiersPaging(val)
{
debugger;
this.bonotifierssource.setPaging(1, val, true);
}

handlebonotifiersGridSelected(event:any) {
this.bonotifiersselectedindex=this.bofactservice.bonotifiers.findIndex(i => i.notifierid === event.data.notifierid);
}
IsbonotifiersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bonotifiersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bonotifiers

}



