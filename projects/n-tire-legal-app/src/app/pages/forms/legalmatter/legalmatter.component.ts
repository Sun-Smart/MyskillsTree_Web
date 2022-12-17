import { legalmatterService } from './../../../service/legalmatter.service';
import { legalmatter } from './../../../model/legalmatter.model';
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
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { legalmatterresponse } from './../../../model/legalmatterresponse.model';
import { legalmatterresponseComponent } from './../../../pages/forms/legalmatterresponse/legalmatterresponse.component';
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
selector: 'app-legalmatter',
templateUrl: './legalmatter.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalmatterComponent implements OnInit {
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
bfilterPopulatelegalmatters:boolean=false;
datalegalmattersbranchid3:any=[];
datalegalmattersmattertype3:any=[];
bfilterPopulatelegalmatterresponses:boolean=false;
@ViewChild('tbllegalmatterresponsessource',{static:false}) tbllegalmatterresponsessource: Ng2SmartTableComponent;
 legalmatterForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
mattertypeList: bomasterdata[];
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
legalmattershowOption:boolean;
legalmatterresponseshowOption:boolean;
sessiondata:any;
sourcekey:any;



legalmatterresponsesvisiblelist:any;
legalmatterresponseshidelist:any;

DeletedlegalmatterresponseIDs: string="";
legalmatterresponsesID: string = "1";
legalmatterresponsesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private legalmatterservice: legalmatterService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private bomasterdataservice:bomasterdataService,
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
this.legalmatterForm  = this.fb.group({
pk:[null],
ImageName: [null],
matterid: [null],
branchid: [null],
branchiddesc: [null],
mattertype: [null],
mattertypedesc: [null],
subject: [null],
description: [null],
assignedto: [null],
target: [null],
billable: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalmatterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalmatterForm.dirty && this.legalmatterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.matterid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.matterid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.matterid && pkDetail) {
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
let legalmatterid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
  this.pkcol = this.sessionService.getItem('usersource');
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
this.formid=legalmatterid;
//this.sharedService.alert(legalmatterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlegalmatterresponsesTableConfig();
  setTimeout(() => {
  this.SetlegalmatterresponsesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.legalmatterservice.formData && this.legalmatterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.legalmatterForm.patchValue({
    branchid: this.legalmatterservice.formData.branchid,
    branchiddesc: this.legalmatterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.legalmatterForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bobranchmastersformatter = (result: any) => result.branchname;
this.bomasterdataservice.getList("aamwa").then(res => {
this.mattertypeList = res as bomasterdata[];
}).catch((err) => {console.log(err);});

//autocomplete
    this.legalmatterservice.getlegalmattersList().then(res => {
      this.pkList = res as legalmatter[];
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
this.legalmatterForm.markAsUntouched();
this.legalmatterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.legalmatterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}




resetForm() {
if (this.legalmatterForm != null)
this.legalmatterForm.reset();
this.legalmatterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
setTimeout(() => {
this.legalmatterservice.legalmatterresponses=[];
this.legalmatterresponsesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let matterid = this.legalmatterForm.get('matterid').value;
        if(matterid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalmatterservice.deletelegalmatter(matterid).then(res =>
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
    this.legalmatterForm.patchValue({
        matterid: null
    });
    if(this.legalmatterservice.formData.matterid!=null)this.legalmatterservice.formData.matterid=null;
for (let i=0;i<this.legalmatterservice.legalmatterresponses.length;i++) {
this.legalmatterservice.legalmatterresponses[i].matterresponseid=null;
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
        else if(key=="assignedto")
this.legalmatterForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(key=="target")
this.legalmatterForm.patchValue({"target":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.legalmatterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalmatterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalmatterForm.controls[key]!=undefined)
{
this.legalmatterForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
{
    this.onSubmitData(true);
}
else if( (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
matteridonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
mattertypeonChange(evt:any){
let e=evt.value;
this.legalmatterForm.patchValue({mattertypedesc:evt.options[evt.options.selectedIndex].text});
}
subjectonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
assignedtoonChange(evt:any){
let e=evt.value;
this.bousermasterservice.getListByuserid(e).then(res => 
{
let arrassignedto=res;
let objassignedto;
if (arrassignedto.length > 0) objassignedto = arrassignedto[0];
if (objassignedto)
{
}
}).catch((err) => {console.log(err);});
}
targetonChange(evt:any){
let e=evt.value;
}
billableonChange(evt:any){
let e=evt.value;
}
attachmentonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
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
  


editlegalmatters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalmatterservice.getlegalmattersByEID(pkcol).then(res => {

this.legalmatterservice.formData=res.legalmatter;
let formproperty=res.legalmatter.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalmatter.pkcol;
this.formid=res.legalmatter.matterid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalmatterservice.formData=res.legalmatter;
this.formid=res.legalmatter.matterid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalmatterForm.patchValue({
matterid: res.legalmatter.matterid,
branchid: res.legalmatter.branchid,
branchiddesc: res.legalmatter.branchiddesc,
mattertype: res.legalmatter.mattertype,
mattertypedesc: res.legalmatter.mattertypedesc,
subject: res.legalmatter.subject,
description: res.legalmatter.description,
assignedto: JSON.parse(res.legalmatter.assignedto),
target: this.ngbDateParserFormatter.parse(res.legalmatter.target),
billable: res.legalmatter.billable,
attachment: JSON.parse(res.legalmatter.attachment),
status: res.legalmatter.status,
statusdesc: res.legalmatter.statusdesc,
});
this.legalmatterresponsesvisiblelist=res.legalmatterresponsesvisiblelist;
if(this.legalmatterForm.get('attachment').value!=null && this.legalmatterForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.legalmatterForm.get('attachment').value);
//Child Tables if any
this.legalmatterservice.legalmatterresponses = res.legalmatterresponses;
this.SetlegalmatterresponsesTableConfig();
this.legalmatterresponsesLoadTable();
  setTimeout(() => {
  this.SetlegalmatterresponsesTableddConfig();
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
  for (let key in this.legalmatterForm.controls) {
    if (this.legalmatterForm.controls[key] != null) {
if(false)
{
if(this.legalmatterservice.formData!=null && this.legalmatterservice.formData[key]!=null  && this.legalmatterservice.formData[key]!='[]' && this.legalmatterservice.formData[key]!=undefined && this.legalmatterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalmatterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalmatterservice.formData!=null && this.legalmatterservice.formData[key]!=null   && this.legalmatterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalmatterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalmatterservice.formData!=null && this.legalmatterservice.formData[key]!=null   && this.legalmatterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalmatterservice.formData[key]+"'><div class='progress__number'>"+this.legalmatterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalmatterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalmatterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legalmatterForm.value;
if(this.legalmatterForm.get('assignedto').value!=null)obj.assignedto=JSON.stringify(this.legalmatterForm.get('assignedto').value);
obj.target=new Date(this.legalmatterForm.get('target').value ? this.ngbDateParserFormatter.format(this.legalmatterForm.get('target').value)+'  UTC' :null);
if(this.fileattachment.getattachmentlist()!=null)obj.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
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

private legalmattertoggleOption(){
this.legalmattershowOption = this.legalmattershowOption === true ? false : true;
}

private legalmatterresponsetoggleOption(){
this.legalmatterresponseshowOption = this.legalmatterresponseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalmatterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalmatterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalmatterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalmatterservice.formData=this.legalmatterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalmatterForm.controls[key] != null)
    {
        this.legalmatterservice.formData[key] = this.legalmatterForm.controls[key].value;
    }
}
}
}
if(this.legalmatterForm.get('assignedto').value!=null)this.legalmatterservice.formData.assignedto=JSON.stringify(this.legalmatterForm.get('assignedto').value);
this.legalmatterservice.formData.target=new Date(this.legalmatterForm.get('target').value ? this.ngbDateParserFormatter.format(this.legalmatterForm.get('target').value)+'  UTC' :null);
if(this.fileattachment.getattachmentlist()!=null)this.legalmatterservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.legalmatterservice.formData.DeletedlegalmatterresponseIDs = this.DeletedlegalmatterresponseIDs;
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.legalmatterservice.formData);
this.legalmatterservice.formData=this.legalmatterForm.value;
this.legalmatterservice.saveOrUpdatelegalmatters().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
if (this.legalmatterresponsessource.data)
{
    for (let i = 0; i < this.legalmatterresponsessource.data.length; i++)
    {
        if (this.legalmatterresponsessource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalmatterresponsessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalmatter);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalmatterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalmatter);
}
else
{
this.FillData(res);
}
}
this.legalmatterForm.markAsUntouched();
this.legalmatterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.legalmatterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmattertype( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalmatterForm.get('mattertype').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlegalmatterresponse(event:any,matterresponseid:any, matterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(legalmatterresponseComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,matterresponseid, matterid,visiblelist:this.legalmatterresponsesvisiblelist,  hidelist:this.legalmatterresponseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.legalmatterresponsessource.add(res);
this.legalmatterresponsessource.refresh();
}
else
{
this.legalmatterresponsessource.update(event.data, res);
}
}
});
}

onDeletelegalmatterresponse(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedlegalmatterresponseIDs += childID + ",";
this.legalmatterservice.legalmatterresponses.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes legalmatterresponses
legalmatterresponsessettings:any;
legalmatterresponsessource: any;

showlegalmatterresponsesCheckbox()
{
debugger;
if(this.tbllegalmatterresponsessource.settings['selectMode']== 'multi')this.tbllegalmatterresponsessource.settings['selectMode']= 'single';
else
this.tbllegalmatterresponsessource.settings['selectMode']= 'multi';
this.tbllegalmatterresponsessource.initGrid();
}
deletelegalmatterresponsesAll()
{
this.tbllegalmatterresponsessource.settings['selectMode'] = 'single';
}
showlegalmatterresponsesFilter()
{
  setTimeout(() => {
  this.SetlegalmatterresponsesTableddConfig();
  });
      if(this.tbllegalmatterresponsessource.settings!=null)this.tbllegalmatterresponsessource.settings['hideSubHeader'] =!this.tbllegalmatterresponsessource.settings['hideSubHeader'];
this.tbllegalmatterresponsessource.initGrid();
}
showlegalmatterresponsesInActive()
{
}
enablelegalmatterresponsesInActive()
{
}
async SetlegalmatterresponsesTableddConfig()
{
if(!this.bfilterPopulatelegalmatterresponses){
}
this.bfilterPopulatelegalmatterresponses=true;
}
async legalmatterresponsesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalmatterresponsesTableConfig()
{
this.legalmatterresponsessettings = {
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
workdate: {
title: 'Work Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
hoursspent: {
title: 'Hours Spent',
type: '',
filter:true,
},
comments: {
title: 'Comments',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
cost: {
title: 'Cost',
type: '',
filter:true,
},
nextactiondate: {
title: 'Next Action Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
attachment: {
title: 'Attachment',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
legalmatterresponsesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalmatterresponsesID)>=0)
{
this.legalmatterresponsessource=new LocalDataSource();
this.legalmatterresponsessource.load(this.legalmatterservice.legalmatterresponses as  any as LocalDataSource);
this.legalmatterresponsessource.setPaging(1, 20, true);
}
}

//external to inline
/*
legalmatterresponsesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalmatterservice.legalmatterresponses.length == 0)
{
    this.tbllegalmatterresponsessource.grid.createFormShown = true;
}
else
{
    let obj = new legalmatterresponse();
    this.legalmatterservice.legalmatterresponses.push(obj);
    this.legalmatterresponsessource.refresh();
    if ((this.legalmatterservice.legalmatterresponses.length / this.legalmatterresponsessource.getPaging().perPage).toFixed(0) + 1 != this.legalmatterresponsessource.getPaging().page)
    {
        this.legalmatterresponsessource.setPage((this.legalmatterservice.legalmatterresponses.length / this.legalmatterresponsessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalmatterresponsessource.grid.edit(this.tbllegalmatterresponsessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalmatterresponsessource.data.indexOf(event.data);
this.onDeletelegalmatterresponse(event,event.data.matterresponseid,((this.legalmatterresponsessource.getPaging().page-1) *this.legalmatterresponsessource.getPaging().perPage)+index);
this.legalmatterresponsessource.refresh();
break;
}
}

*/
legalmatterresponsesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditlegalmatterresponse(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditlegalmatterresponse(event,event.data.matterresponseid,this.formid);
break;
case 'delete':
this.onDeletelegalmatterresponse(event,event.data.matterresponseid,((this.legalmatterresponsessource.getPaging().page-1) *this.legalmatterresponsessource.getPaging().perPage)+event.index);
this.legalmatterresponsessource.refresh();
break;
}
}
legalmatterresponsesonDelete(obj) {
let matterresponseid=obj.data.matterresponseid;
if (confirm('Are you sure to delete this record ?')) {
this.legalmatterservice.deletelegalmatter(matterresponseid).then(res=>
this.legalmatterresponsesLoadTable()
);
}
}
legalmatterresponsesPaging(val)
{
debugger;
this.legalmatterresponsessource.setPaging(1, val, true);
}

handlelegalmatterresponsesGridSelected(event:any) {
this.legalmatterresponsesselectedindex=this.legalmatterservice.legalmatterresponses.findIndex(i => i.matterresponseid === event.data.matterresponseid);
}
IslegalmatterresponsesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalmatterresponsesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalmatterresponses

}



