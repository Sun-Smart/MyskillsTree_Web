import { pmspropertydocumentService } from './../../../service/pmspropertydocument.service';
import { pmspropertydocument } from './../../../model/pmspropertydocument.model';
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
import { pmsproperty} from './../../../model/pmsproperty.model';
import { pmspropertyService } from './../../../service/pmsproperty.service';
//popups
import { pmspropertyunit} from './../../../model/pmspropertyunit.model';
import { pmspropertyunitService } from './../../../service/pmspropertyunit.service';
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
selector: 'app-pmspropertydocument',
templateUrl: './pmspropertydocument.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmspropertydocumentComponent implements OnInit {
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
bfilterPopulatepmspropertydocuments:boolean=false;
datapmspropertydocumentspropertyid3:any=[];
datapmspropertydocumentsunitid3:any=[];
 pmspropertydocumentForm: FormGroup;
propertyidList: pmsproperty[];
propertyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
propertyid_pmspropertiesForm: FormGroup;//autocomplete
propertyid_pmspropertiesoptions:any;//autocomplete
propertyid_pmspropertiesformatter:any;//autocomplete
unitidList: pmspropertyunit[];
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
pmspropertydocumentshowOption:boolean;
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
private pmspropertydocumentservice: pmspropertydocumentService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private pmspropertyservice:pmspropertyService,
private pmspropertyunitservice:pmspropertyunitService,
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
this.pmspropertydocumentForm  = this.fb.group({
pk:[null],
ImageName: [null],
documentid: [null],
propertyid: [null],
propertyiddesc: [null],
unitid: [null],
unitiddesc: [null],
documentname: [null],
createdon: [null],
expiry: [null],
renewdate: [null],
attachment: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmspropertydocumentForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmspropertydocumentForm.dirty && this.pmspropertydocumentForm.touched ) {
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
????let??pos??=??this.pkList.map(function(e:any)??{??return e.documentid.toString();??}).indexOf(this.formid.toString());
????if(pos>0)??this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
????debugger;
let??pos??=??this.pkList.map(function(e:any)??{??return??e.documentid.toString();??}).indexOf(this.formid.toString());
????if(pos>=0??&&??pos!=this.pkList.length)??this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.documentid && pkDetail) {
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
let pmspropertydocumentid = null;

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
this.formid=pmspropertydocumentid;
//this.sharedService.alert(pmspropertydocumentid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.pmspropertyservice.getpmspropertiesList().then(res => 
{
this.propertyidList = res as pmsproperty[];
if(this.pmspropertydocumentservice.formData && this.pmspropertydocumentservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmspropertydocumentForm.patchValue({
    propertyid: this.pmspropertydocumentservice.formData.propertyid,
    propertyiddesc: this.pmspropertydocumentservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmspropertydocumentForm.get('propertyid').value);
let objpropertyid;
if (arrpropertyid.length > 0) objpropertyid = arrpropertyid[0];
if (objpropertyid)
{
}
}
}
).catch((err) => {console.log(err);});
this.propertyid_pmspropertiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.propertyidList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.propertyid_pmspropertiesformatter = (result: any) => result.title;
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
if(this.pmspropertydocumentservice.formData && this.pmspropertydocumentservice.formData.unitid){this.pmspropertydocumentForm.patchValue({
    unitid: this.pmspropertydocumentservice.formData.unitid,
    unitiddesc: this.pmspropertydocumentservice.formData.unitiddesc,
});
}
}).catch((err) => {console.log(err);});
});

//autocomplete
    this.pmspropertydocumentservice.getpmspropertydocumentsList().then(res => {
      this.pkList = res as pmspropertydocument[];
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
this.pmspropertydocumentForm.markAsUntouched();
this.pmspropertydocumentForm.markAsPristine();
}
onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmspropertydocumentForm.patchValue({
propertyid: propertyidDetail.propertyid,
propertyiddesc: propertyidDetail.title,

});
this.pmspropertyunitservice.getListBypropertyid(propertyidDetail.propertyid).then(res => {
 this.unitidList = res as pmspropertyunit[]
}).catch((err) => {console.log(err);});

}
}




resetForm() {
if (this.pmspropertydocumentForm != null)
this.pmspropertydocumentForm.reset();
this.pmspropertydocumentForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let documentid = this.pmspropertydocumentForm.get('documentid').value;
        if(documentid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmspropertydocumentservice.deletepmspropertydocument(documentid).then(res =>
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
    this.pmspropertydocumentForm.patchValue({
        documentid: null
    });
    if(this.pmspropertydocumentservice.formData.documentid!=null)this.pmspropertydocumentservice.formData.documentid=null;
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
        else if(key=="createdon")
this.pmspropertydocumentForm.patchValue({"createdon":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="expiry")
this.pmspropertydocumentForm.patchValue({"expiry":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="renewdate")
this.pmspropertydocumentForm.patchValue({"renewdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmspropertydocumentForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmspropertydocumentForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmspropertydocumentForm.controls[key]!=undefined)
{
this.pmspropertydocumentForm.controls[key].disable({onlySelf: true});
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
documentidonChange(evt:any){
let e=evt.value;
}
propertyidonChange(evt:any){
let e=evt.value;
}
unitidonChange(evt:any){
let e=evt.value;
this.pmspropertydocumentForm.patchValue({unitiddesc:evt.options[evt.options.selectedIndex].text});
}
documentnameonChange(evt:any){
let e=evt.value;
}
createdononChange(evt:any){
let e=evt.value;
}
expiryonChange(evt:any){
let e=evt.value;
}
renewdateonChange(evt:any){
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
????


editpmspropertydocuments() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmspropertydocumentservice.getpmspropertydocumentsByEID(pkcol).then(res => {

this.pmspropertydocumentservice.formData=res.pmspropertydocument;
let formproperty=res.pmspropertydocument.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmspropertydocument.pkcol;
this.formid=res.pmspropertydocument.documentid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmspropertydocument.documentid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmspropertydocumentForm.patchValue({
documentid: res.pmspropertydocument.documentid,
propertyid: res.pmspropertydocument.propertyid,
propertyiddesc: res.pmspropertydocument.propertyiddesc,
unitid: res.pmspropertydocument.unitid,
unitiddesc: res.pmspropertydocument.unitiddesc,
documentname: res.pmspropertydocument.documentname,
createdon: this.ngbDateParserFormatter.parse(res.pmspropertydocument.createdon),
expiry: this.ngbDateParserFormatter.parse(res.pmspropertydocument.expiry),
renewdate: this.ngbDateParserFormatter.parse(res.pmspropertydocument.renewdate),
attachment: JSON.parse(res.pmspropertydocument.attachment),
status: res.pmspropertydocument.status,
statusdesc: res.pmspropertydocument.statusdesc,
});
if(this.pmspropertydocumentForm.get('attachment').value!=null && this.pmspropertydocumentForm.get('attachment').value!="" && this.fileattachment!=null && this.fileattachment!=undefined)this.fileattachment.setattachmentlist(this.pmspropertydocumentForm.get('attachment').value);
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
}).catch((err) => {console.log(err);});
});
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
  for (let key in this.pmspropertydocumentForm.controls) {
    if (this.pmspropertydocumentForm.controls[key] != null) {
if(false)
{
if(this.pmspropertydocumentservice.formData!=null && this.pmspropertydocumentservice.formData[key]!=null  && this.pmspropertydocumentservice.formData[key]!='[]' && this.pmspropertydocumentservice.formData[key]!=undefined && this.pmspropertydocumentservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmspropertydocumentservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmspropertydocumentservice.formData!=null && this.pmspropertydocumentservice.formData[key]!=null   && this.pmspropertydocumentservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmspropertydocumentservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmspropertydocumentservice.formData!=null && this.pmspropertydocumentservice.formData[key]!=null   && this.pmspropertydocumentservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmspropertydocumentservice.formData[key]+"'><div class='progress__number'>"+this.pmspropertydocumentservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmspropertydocumentForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmspropertydocumentForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmspropertydocumentForm.value;
obj.createdon=new Date(this.pmspropertydocumentForm.get('createdon').value ? this.ngbDateParserFormatter.format(this.pmspropertydocumentForm.get('createdon').value)+'  UTC' :null);
obj.expiry=new Date(this.pmspropertydocumentForm.get('expiry').value ? this.ngbDateParserFormatter.format(this.pmspropertydocumentForm.get('expiry').value)+'  UTC' :null);
obj.renewdate=new Date(this.pmspropertydocumentForm.get('renewdate').value ? this.ngbDateParserFormatter.format(this.pmspropertydocumentForm.get('renewdate').value)+'  UTC' :null);
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

private pmspropertydocumenttoggleOption(){
this.pmspropertydocumentshowOption = this.pmspropertydocumentshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmspropertydocumentForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmspropertydocumentForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmspropertydocumentForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmspropertydocumentservice.formData=this.pmspropertydocumentForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmspropertydocumentForm.controls[key] != null)
    {
        this.pmspropertydocumentservice.formData[key] = this.pmspropertydocumentForm.controls[key].value;
    }
}
}
}
this.pmspropertydocumentservice.formData.createdon=new Date(this.pmspropertydocumentForm.get('createdon').value ? this.ngbDateParserFormatter.format(this.pmspropertydocumentForm.get('createdon').value)+'  UTC' :null);
this.pmspropertydocumentservice.formData.expiry=new Date(this.pmspropertydocumentForm.get('expiry').value ? this.ngbDateParserFormatter.format(this.pmspropertydocumentForm.get('expiry').value)+'  UTC' :null);
this.pmspropertydocumentservice.formData.renewdate=new Date(this.pmspropertydocumentForm.get('renewdate').value ? this.ngbDateParserFormatter.format(this.pmspropertydocumentForm.get('renewdate').value)+'  UTC' :null);
if(this.fileattachment.getattachmentlist()!=null)this.pmspropertydocumentservice.formData.attachment=JSON.stringify(this.fileattachment.getattachmentlist());
this.fileattachmentlist=this.fileattachment.getAllFiles();
console.log(this.pmspropertydocumentservice.formData);
this.pmspropertydocumentservice.formData=this.pmspropertydocumentForm.value;
this.pmspropertydocumentservice.saveOrUpdatepmspropertydocuments().subscribe(
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
this.dialogRef.close((res as any).pmspropertydocument);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmspropertydocumentservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmspropertydocument);
}
else
{
this.FillData(res);
}
}
this.pmspropertydocumentForm.markAsUntouched();
this.pmspropertydocumentForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpropertyid( propertyid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyComponent, 
{
data: {propertyid:this.pmspropertydocumentForm.get('propertyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditunitid( unitid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyunitComponent, 
{
data: {unitid:this.pmspropertydocumentForm.get('unitid').value, ScreenType:2 }
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



