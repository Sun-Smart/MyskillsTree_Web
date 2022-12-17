import { hrmsadvertisementdetailService } from './../../../service/hrmsadvertisementdetail.service';
import { hrmsadvertisementdetail } from './../../../model/hrmsadvertisementdetail.model';
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
import { hrmsmanpowerrequest} from './../../../model/hrmsmanpowerrequest.model';
import { hrmsmanpowerrequestService } from './../../../service/hrmsmanpowerrequest.service';
//popups
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
//popups
//detail table services
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
selector: 'app-hrmsadvertisementdetail',
templateUrl: './hrmsadvertisementdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsadvertisementdetailComponent implements OnInit {
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
bfilterPopulatehrmsadvertisementdetails:boolean=false;
datahrmsadvertisementdetailsmprid3:any=[];
datahrmsadvertisementdetailsroleid3:any=[];
datahrmsadvertisementdetailsmediatype3:any=[];
 hrmsadvertisementdetailForm: FormGroup;
mpridList: hrmsmanpowerrequest[];
mpridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
mprid_hrmsmanpowerrequestsForm: FormGroup;//autocomplete
mprid_hrmsmanpowerrequestsoptions:any;//autocomplete
mprid_hrmsmanpowerrequestsformatter:any;//autocomplete
roleidList: bouserrolemaster[];
roleidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
roleid_bouserrolemastersForm: FormGroup;//autocomplete
roleid_bouserrolemastersoptions:any;//autocomplete
roleid_bouserrolemastersformatter:any;//autocomplete
mediatypeList: boconfigvalue[];
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
hrmsadvertisementdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;






constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsadvertisementdetailservice: hrmsadvertisementdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsmanpowerrequestservice:hrmsmanpowerrequestService,
private bouserrolemasterservice:bouserrolemasterService,
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
this.hrmsadvertisementdetailForm  = this.fb.group({
pk:[null],
ImageName: [null],
advertisementid: [null],
detailid: [null],
mprid: [null],
mpriddesc: [null],
roleid: [null],
roleiddesc: [null],
quantity: [null],
media: [null],
mediatype: [null],
mediatypedesc: [null],
fromdate: [null],
todate: [null],
details: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsadvertisementdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsadvertisementdetailForm.dirty && this.hrmsadvertisementdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.detailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.detailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.detailid && pkDetail) {
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
let hrmsadvertisementdetailid = null;

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
this.formid=hrmsadvertisementdetailid;
//this.sharedService.alert(hrmsadvertisementdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.hrmsmanpowerrequestservice.gethrmsmanpowerrequestsList().then(res => 
{
this.mpridList = res as hrmsmanpowerrequest[];
if(this.hrmsadvertisementdetailservice.formData && this.hrmsadvertisementdetailservice.formData.mprid){
this.mpridoptionsEvent.emit(this.mpridList);
this.hrmsadvertisementdetailForm.patchValue({
    mprid: this.hrmsadvertisementdetailservice.formData.mprid,
    mpriddesc: this.hrmsadvertisementdetailservice.formData.mpriddesc,
});
}
{
let arrmprid = this.mpridList.filter(v => v.mprid == this.hrmsadvertisementdetailForm.get('mprid').value);
let objmprid;
if (arrmprid.length > 0) objmprid = arrmprid[0];
if (objmprid)
{
}
}
}
).catch((err) => {console.log(err);});
this.mprid_hrmsmanpowerrequestsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.mpridList.filter(v => v.mprreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.mprid_hrmsmanpowerrequestsformatter = (result: any) => result.mprreference;
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.roleidList = res as bouserrolemaster[];
if(this.hrmsadvertisementdetailservice.formData && this.hrmsadvertisementdetailservice.formData.roleid){
this.roleidoptionsEvent.emit(this.roleidList);
this.hrmsadvertisementdetailForm.patchValue({
    roleid: this.hrmsadvertisementdetailservice.formData.roleid,
    roleiddesc: this.hrmsadvertisementdetailservice.formData.roleiddesc,
});
}
{
let arrroleid = this.roleidList.filter(v => v.userroleid == this.hrmsadvertisementdetailForm.get('roleid').value);
let objroleid;
if (arrroleid.length > 0) objroleid = arrroleid[0];
if (objroleid)
{
}
}
}
).catch((err) => {console.log(err);});
this.roleid_bouserrolemastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.roleidList.filter(v => v.userrole.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.roleid_bouserrolemastersformatter = (result: any) => result.userrole;
this.configservice.getList("mediatype").then(res => this.mediatypeList = res as boconfigvalue[]);

//autocomplete
    this.hrmsadvertisementdetailservice.gethrmsadvertisementdetailsList().then(res => {
      this.pkList = res as hrmsadvertisementdetail[];
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
this.hrmsadvertisementdetailForm.markAsUntouched();
this.hrmsadvertisementdetailForm.markAsPristine();
}
onSelectedmprid(mpridDetail: any) {
if (mpridDetail.mprid && mpridDetail) {
this.hrmsadvertisementdetailForm.patchValue({
mprid: mpridDetail.mprid,
mpriddesc: mpridDetail.mprreference,

});

}
}

onSelectedroleid(roleidDetail: any) {
if (roleidDetail.userroleid && roleidDetail) {
this.hrmsadvertisementdetailForm.patchValue({
roleid: roleidDetail.userroleid,
roleiddesc: roleidDetail.userrole,

});

}
}




resetForm() {
if (this.hrmsadvertisementdetailForm != null)
this.hrmsadvertisementdetailForm.reset();
this.hrmsadvertisementdetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let detailid = this.hrmsadvertisementdetailForm.get('detailid').value;
        if(detailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsadvertisementdetailservice.deletehrmsadvertisementdetail(detailid).then(res =>
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
    this.hrmsadvertisementdetailForm.patchValue({
        detailid: null
    });
    if(this.hrmsadvertisementdetailservice.formData.detailid!=null)this.hrmsadvertisementdetailservice.formData.detailid=null;
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
        else if(key=="fromdate")
this.hrmsadvertisementdetailForm.patchValue({"fromdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="todate")
this.hrmsadvertisementdetailForm.patchValue({"todate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsadvertisementdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsadvertisementdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsadvertisementdetailForm.controls[key]!=undefined)
{
this.hrmsadvertisementdetailForm.controls[key].disable({onlySelf: true});
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
advertisementidonChange(evt:any){
let e=evt.value;
}
detailidonChange(evt:any){
let e=evt.value;
}
mpridonChange(evt:any){
let e=evt.value;
}
roleidonChange(evt:any){
let e=evt.value;
}
quantityonChange(evt:any){
let e=evt.value;
}
mediaonChange(evt:any){
let e=evt.value;
}
mediatypeonChange(evt:any){
let e=this.f.mediatype.value as any;
this.hrmsadvertisementdetailForm.patchValue({mediatypedesc:evt.options[evt.options.selectedIndex].text});
}
fromdateonChange(evt:any){
let e=evt.value;
}
todateonChange(evt:any){
let e=evt.value;
}
detailsonChange(evt:any){
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
  


edithrmsadvertisementdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsadvertisementdetailservice.gethrmsadvertisementdetailsByEID(pkcol).then(res => {

this.hrmsadvertisementdetailservice.formData=res.hrmsadvertisementdetail;
let formproperty=res.hrmsadvertisementdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsadvertisementdetail.pkcol;
this.formid=res.hrmsadvertisementdetail.detailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsadvertisementdetail.detailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsadvertisementdetailForm.patchValue({
advertisementid: res.hrmsadvertisementdetail.advertisementid,
detailid: res.hrmsadvertisementdetail.detailid,
mprid: res.hrmsadvertisementdetail.mprid,
mpriddesc: res.hrmsadvertisementdetail.mpriddesc,
roleid: res.hrmsadvertisementdetail.roleid,
roleiddesc: res.hrmsadvertisementdetail.roleiddesc,
quantity: res.hrmsadvertisementdetail.quantity,
media: res.hrmsadvertisementdetail.media,
mediatype: res.hrmsadvertisementdetail.mediatype,
mediatypedesc: res.hrmsadvertisementdetail.mediatypedesc,
fromdate: this.ngbDateParserFormatter.parse(res.hrmsadvertisementdetail.fromdate),
todate: this.ngbDateParserFormatter.parse(res.hrmsadvertisementdetail.todate),
details: res.hrmsadvertisementdetail.details,
attachment: JSON.parse(res.hrmsadvertisementdetail.attachment),
status: res.hrmsadvertisementdetail.status,
statusdesc: res.hrmsadvertisementdetail.statusdesc,
});
if(this.hrmsadvertisementdetailForm.get('attachment').value!=null && this.hrmsadvertisementdetailForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.hrmsadvertisementdetailForm.get('attachment').value);
//Child Tables if any
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
  for (let key in this.hrmsadvertisementdetailForm.controls) {
    if (this.hrmsadvertisementdetailForm.controls[key] != null) {
if(false)
{
if(this.hrmsadvertisementdetailservice.formData!=null && this.hrmsadvertisementdetailservice.formData[key]!=null  && this.hrmsadvertisementdetailservice.formData[key]!='[]' && this.hrmsadvertisementdetailservice.formData[key]!=undefined && this.hrmsadvertisementdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsadvertisementdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsadvertisementdetailservice.formData!=null && this.hrmsadvertisementdetailservice.formData[key]!=null   && this.hrmsadvertisementdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsadvertisementdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsadvertisementdetailservice.formData!=null && this.hrmsadvertisementdetailservice.formData[key]!=null   && this.hrmsadvertisementdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsadvertisementdetailservice.formData[key]+"'><div class='progress__number'>"+this.hrmsadvertisementdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsadvertisementdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsadvertisementdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsadvertisementdetailForm.value;
obj.fromdate=new Date(this.hrmsadvertisementdetailForm.get('fromdate').value ? this.ngbDateParserFormatter.format(this.hrmsadvertisementdetailForm.get('fromdate').value)+'  UTC' :null);
obj.todate=new Date(this.hrmsadvertisementdetailForm.get('todate').value ? this.ngbDateParserFormatter.format(this.hrmsadvertisementdetailForm.get('todate').value)+'  UTC' :null);
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

private hrmsadvertisementdetailtoggleOption(){
this.hrmsadvertisementdetailshowOption = this.hrmsadvertisementdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsadvertisementdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsadvertisementdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsadvertisementdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsadvertisementdetailservice.formData=this.hrmsadvertisementdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsadvertisementdetailForm.controls[key] != null)
    {
        this.hrmsadvertisementdetailservice.formData[key] = this.hrmsadvertisementdetailForm.controls[key].value;
    }
}
}
}
this.hrmsadvertisementdetailservice.formData.fromdate=new Date(this.hrmsadvertisementdetailForm.get('fromdate').value ? this.ngbDateParserFormatter.format(this.hrmsadvertisementdetailForm.get('fromdate').value)+'  UTC' :null);
this.hrmsadvertisementdetailservice.formData.todate=new Date(this.hrmsadvertisementdetailForm.get('todate').value ? this.ngbDateParserFormatter.format(this.hrmsadvertisementdetailForm.get('todate').value)+'  UTC' :null);
this.hrmsadvertisementdetailservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.hrmsadvertisementdetailservice.formData);
this.hrmsadvertisementdetailservice.formData=this.hrmsadvertisementdetailForm.value;
this.hrmsadvertisementdetailservice.saveOrUpdatehrmsadvertisementdetails().subscribe(
async res => {
await this.sharedService.upload(this.fileattachmentlist);
this.attachmentlist=[];
if(this.fileattachment)this.fileattachment.clear();
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsadvertisementdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsadvertisementdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsadvertisementdetail);
}
else
{
this.FillData(res);
}
}
this.hrmsadvertisementdetailForm.markAsUntouched();
this.hrmsadvertisementdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditmprid( mprid) {
/*let ScreenType='2';
this.dialog.open(hrmsmanpowerrequestComponent, 
{
data: {mprid:this.hrmsadvertisementdetailForm.get('mprid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditroleid( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsadvertisementdetailForm.get('roleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



